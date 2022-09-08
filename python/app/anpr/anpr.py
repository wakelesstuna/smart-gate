import cv2
from matplotlib import pyplot as plt
import numpy as np
import imutils
import pytesseract


class NumberPlateReader:
    def __init__(self, path_to_tesseract_exe, minAR=4, maxAR=5, debug=False):
        self.minAr = minAR
        self.maxAr = maxAR
        self.debug = debug
        self.pathToTesseract = path_to_tesseract_exe
        self.setup_tesseract(path=path_to_tesseract_exe)

    def debug_imshow(self, image):
        # check to see if we are in debug mode, and if so, show the
        # image with the supplied title
        if self.debug:
            plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
            plt.show()

    def setup_tesseract(self, path):
        print("Setting up tesseract...")
        pytesseract.pytesseract.tesseract_cmd = path

    def process_image(self, img):
        # Processing the image
        print("Processing image...")
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        self.debug_imshow(gray)

        # Moise reduction
        bfilter = cv2.bilateralFilter(gray, 11, 17, 17)
        # Edge detection
        edged = cv2.Canny(bfilter, 30, 200)
        self.debug_imshow(edged)

        # Find the contours of the plate
        keypoints = cv2.findContours(
            edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        contours = imutils.grab_contours(keypoints)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

        # Find the 4 corners
        location = None
        for contour in contours:
            approx = cv2.approxPolyDP(contour, 10, True)
            if len(approx) == 4:
                location = approx
                break

        mask = np.zeros(gray.shape, np.uint8)
        new_image = cv2.drawContours(mask, [location], 0, 255, -1)
        new_image = cv2.bitwise_and(img, img, mask=mask)

        self.debug_imshow(new_image)

        # Crop the image to just around the plate
        (x, y) = np.where(mask == 255)
        (x1, y1) = (np.min(x), np.min(y))
        (x2, y2) = (np.max(x), np.max(y))
        cropped_image = gray[x1:x2+2, y1:y2+2]

        self.debug_imshow(cropped_image)

        return cropped_image

    def read_text_from_image(self, image):
        # Setting options for the tesseract
        options = '--oem 3 --psm 8 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

        # Reading the text from the plate
        print("Reading text...")
        lpText = pytesseract.image_to_string(image, config=options)

        if lpText is None:
            print("Could not read text from image")

        print("Done!")
        return lpText

    def read_number_plate(self, image):
        processed_image = self.process_image(image)
        lpText = self.read_text_from_image(processed_image)

        return {"number_plate": lpText[0:-1], "sucess": True if lpText else False}
