# Pair Kerning

Simple JavaScript library for kerning HTML.

Specify pairs of characters and width, and Span tags will be inserted to kern them.

*Read this in other language: [日本語](README.ja.md)

### Usage
----

Firstly specify pairs of characters to kern and width(em) between them.

```
var pairs = [
        ["JL", 0.1], //Example of specific character combination
        [".@", -0.05], //Example of using wild card + specific character
        ["[^\x01-\x7E\xA1-\xDF][a-zA-Z]", 0.1], //Example of range specification(double byte character + alphabet)
    ];
```

Specify the class name to be applied and call pairKern()

```
window.onload = function() {
    pairKern("targetClassName", pairs);
}
```

### Writing the Pairs
----

You can use Javascript regular expressions to specify the pairs.

However, use an expression that specifies one character for each pair.

```
var pairs = [
        ["[^A].", 0.1], //Example of any character except specific character + wildcard (valid)
        ["A{2,}.", 0.1] //Example of specifying 2 or more characters (invalid)
    ];
```

When handling a regular character as a non-special character, \\\\ (2 backlash) is necessary.

```
var pairs = [
        [".\\(", 0.1] //Example of wildcard + left bracket
    ];
```

If the string matches multiple defined pairs, only pair close to the tail of the array is applied.

```
var pairs = [
        ["[a-zA-Z][\u3041-\u3096]", 0.1], //Example of range specification(alphabet and Hiragana)
        ["L[\u3041-\u3096]", 0.05] //Only in case of L + Hiragana, width is 0.05em
    ];
```

### Others
----

When using CSS selectors, please note the changes in the node tree since the library inserts Span tags and changes it.