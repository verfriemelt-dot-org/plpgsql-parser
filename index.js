const antlr4 = require('antlr4');
const plpgsqlLexer = require('./js/plpgsqlLexer.js');
const plpgsqlParser = require('./js/plpgsqlParser.js');
const plpgsqlVisitor = require('./js/plpgsqlVisitor.js').plpgsqlVisitor;
const plpgsqlListener = require('./js/plpgsqlListener.js').plpgsqlListener;
const fs = require('fs');


var input = fs.readFileSync( 'input' ).toString();

const chars = new antlr4.InputStream(input);
const lexer = new plpgsqlLexer.plpgsqlLexer(chars);

lexer.strictMode = false; // do not use js strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new plpgsqlParser.plpgsqlParser(tokens);

// root is the first level in grammer
const tree = parser.root();

// console.log( tree );

// console.log(tree.toStringTree(parser.ruleNames));


class listener extends plpgsqlListener {
  
  constructor( res ) {
    
    super();
    
    this.skip = false;
    this.result = res;
    this.depth = 0;
    
  }
  
  format( input ) {
    
    if ( this.skip ) {
      return;
    }
    
    if ( input == ',') {
      this.result.push(',');
      return;
    }
    
    this.result.push(
        ' '.repeat( this.depth )
      + input
    );
  }
  
  visitTerminal( ctx ) {
    this.format(ctx.getText());
  }
  
  enterExpr() {
    this.depth += 2;
  }  
  
  exitExpr() {
    this.depth -= 2;
  }
  
  enterColumn_list( ctx ) {
    
    console.log('columnlist');
    
    
    let child;
    
    this.depth += 2;
    
    for( child of ctx.children ) {
       this.format( child.getText() );
    }
    
    this.depth -= 2;
    this.skip = true;
  }
  
  exitColumn_list( ctx ) {
    this.skip = false;
    console.log('exit');
  }
  

}

let result = [];

const l = new listener( result );

antlr4.tree.ParseTreeWalker.DEFAULT.walk( l, tree );

console.log(result);

