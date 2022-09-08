from anpr import NumberPlateReader
import cv2

path = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
imagePath = r'license_plates/image3.jpg'

# initialize ANPR class
anpr = NumberPlateReader(path_to_tesseract_exe=path, debug=False)

# load the image we want to read
img = cv2.imread(imagePath)

# Read the number plate from the image
result = anpr.read_number_plate(img)

print(result)
