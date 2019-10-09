const antlr4 = require('antlr4');
const plpgsqlLexer = require('./js/plpgsqlLexer.js');
const plpgsqlParser = require('./js/plpgsqlParser.js');
const plpgsqlVisitor = require('./js/plpgsqlVisitor.js').plpgsqlVisitor;

const input = 'select ( select b.wut from ( select true ) as b( wut ) ) from ( select true );';

const chars = new antlr4.InputStream(input);
const lexer = new plpgsqlLexer.plpgsqlLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new plpgsqlParser.plpgsqlParser(tokens);

// root is the first level in grammer
const tree = parser.root();

// console.log( tree );

// console.log(tree.toStringTree(parser.ruleNames));


class Visitor extends plpgsqlVisitor {
   
  start(ctx) {
    return this.visitExpressionSequence(ctx);
  }
  
  /**
   * Visits children of current node
   *
   * @param {object} ctx
   * @returns {string}
   */
  visitChildren(ctx) {
    let code = '';
    
    for (let i = 0; i < ctx.getChildCount(); i++) {
      code += "\n" + ' '.repeat( ctx.depth() ) + this.visit(ctx.getChild(i));
    }

    return code.trim();
  }

  /**
   * Visits a leaf node and returns a string
   *
   * @param {object} ctx
   * @returns {string}
   */
  visitTerminal(ctx) {
    // console.log('----------------');
    // console.log( ctx.parentCtx.start.type );
    // console.log( ctx.parentCtx.parser.ruleNames[ ctx.parentCtx.start.type  ] );
    
    
    
    return ctx.parentCtx.parser.ruleNames[ ctx.parentCtx.stop.type  ] +":   "  + ctx.getText();
  }


}

const v = new Visitor();
console.log(v.visit( tree ));
