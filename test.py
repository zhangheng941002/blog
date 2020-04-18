import os
from PIL import Image

path = os.path.join(os.getcwd(), "xc_img3.jpg")
# path = os.path.join(os.getcwd(), "111111.jpg")
img = Image.open(path)

print(img.format)  # PNG
print(img.size)


# (700, 400)
outfile = './new.jpg'
out = img.resize((700, 400), Image.ANTIALIAS)  # resize image with high-quality
out.save(outfile)

a = "234"

print(a[:10])
