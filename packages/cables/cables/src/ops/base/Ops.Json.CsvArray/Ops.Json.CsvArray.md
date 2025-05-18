Let’s you open uploaded [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) (character-separated-values)-files, which can be used to store tabular data, e.g.

```
Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00
```

If your CSV-file has a header-row, you have to manually ignore it (index 0), or just delete it from the file. 
The result will be a two-dimensional array containing the rows and individual row-values.
