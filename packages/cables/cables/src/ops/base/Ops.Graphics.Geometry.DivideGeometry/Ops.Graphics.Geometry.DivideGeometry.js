let geometry = op.inObject("Geometry");
let outGeom = op.outObject("Result");

geometry.onChange = update;

function update()
{
    outGeom.set(null);
    if (geometry.get())
    {
        let geom = geometry.get();
        let newGeom = new CGL.Geometry(op.name);

        let newVerts = [];
        let newFaces = [];
        let newNormals = [];
        let newTexCoords = [];

        for (let i = 0; i < geom.verticesIndices.length; i += 3)
        {
            newFaces.push(newVerts.length / 3);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 0] * 3 + 0]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 0] * 3 + 1]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 0] * 3 + 2]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 0] * 3 + 0]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 0] * 3 + 1]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 0] * 3 + 2]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 0] * 2 + 0]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 0] * 2 + 1]);

            newFaces.push(newVerts.length / 3);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 1] * 3 + 0]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 1] * 3 + 1]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 1] * 3 + 2]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 1] * 3 + 0]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 1] * 3 + 1]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 1] * 3 + 2]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 1] * 2 + 0]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 1] * 2 + 1]);

            newFaces.push(newVerts.length / 3);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 2] * 3 + 0]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 2] * 3 + 1]);
            newVerts.push(geom.vertices[geom.verticesIndices[i + 2] * 3 + 2]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 2] * 3 + 0]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 2] * 3 + 1]);
            newNormals.push(geom.vertexNormals[geom.verticesIndices[i + 2] * 3 + 2]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 2] * 2 + 0]);
            newTexCoords.push(geom.texCoords[geom.verticesIndices[i + 2] * 2 + 1]);
        }

        newGeom.vertices = newVerts;
        newGeom.vertexNormals = newNormals;
        newGeom.verticesIndices = newFaces;
        newGeom.setTexCoords(newTexCoords);

        outGeom.set(newGeom);
    }
}
