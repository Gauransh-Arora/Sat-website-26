from PIL import Image

def find_hole():
    img = Image.open('src/assets/aftermovie_frame.png').convert("RGBA")
    w, h = img.size
    
    # We want to find the bounding box of pixels that are fully transparent or nearly transparent
    pixels = img.load()
    
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    
    # Just sample a grid to find roughly where it is
    for y in range(0, h, 10):
        for x in range(0, w, 10):
            r, g, b, a = pixels[x, y]
            if a < 10: # transparent hole
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    print(f"Hole bounds: x: {min_x} to {max_x}, y: {min_y} to {max_y}")
    print(f"Width %: {(max_x - min_x) / w * 100:.2f}%")
    print(f"Height %: {(max_y - min_y) / h * 100:.2f}%")
    print(f"Top %: {min_y / h * 100:.2f}%")
    print(f"Left %: {min_x / w * 100:.2f}%")

find_hole()
