const print = require("print");
let parens = "()((())())"

function lexer(parens) {
    if(!isValid(parens)){
        throw new Error("InvalidSyntax", "Invalid Syntax")
    }
    return parens.split('').map(t => {
        if (t == "(") {
            return { type: "open", value: t }
        } else if (t == ")") {
            return { type: "close", value: t }
        }
    })
}

function isValid(parens){
    while(/(\(\))+/g.test(parens)){
        parens = parens.replace(/(\(\))+/, "")
    }
    return !parens
}

function parser(tokens, recursive = false) {
    var AST = []
    while (tokens.length > 0) {
        let currentToken = tokens.shift()
        let nextToken = tokens[0]
        if (currentToken.type == "open" && nextToken.type == "close") {
            AST.push({ name: "node" })
        } else if (currentToken.type == "open" && nextToken.type == "open") {
            AST.push({ name: "node", childs: parser(tokens, true) })
        } else if (recursive && currentToken.type == "close" && nextToken.type == "close") {
            break;
        }
    }
    return AST
}

console.group(print(parser(lexer(parens))))