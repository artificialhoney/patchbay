# Transform

_Ops.Gl.Matrix.Transform_

Can be used to move or rotate objects. All elements which are drawn afterwards will be affected by this. If you use multiple transforms in a row the transformations will be stacked on top of each other (added).

## Input

### Render

_Type: Function_
Red color value, between `0.0` and `1.0`

### Position X

_Type: Value_
X-position change

### Position Y

_Type: Value_
Y-position change

### Position Z

_Type: Value_
Z-position change

### Scale

_Type: Value_
Changes the scale of the objects drawn afterwards – when smaller than `1` the object will be drawn smaller, when bigger than `1` the object will be drawn bigger.

### Rotation X

_Type: Value_
X-rotation change

### Rotation Y

_Type: Value_
Y-rotation change

### Rotation Z

_Type: Value_
Z-rotation change

## Output

### Trigger

_Type: Function_
Every time `Transform` is triggered, it will also trigger all connected ops.

## Examples

- [Sphere Rotation Example](https://cables.gl/edit/5702a838df94c65f116d27ef)
- [Basic Cube Light](https://cables.gl/edit/5702a7fd99572b98331e3659)
