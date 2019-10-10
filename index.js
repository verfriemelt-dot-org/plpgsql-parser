const antlr4 = require('antlr4');
const plpgsqlLexer = require('./js/plpgsqlLexer.js');
const plpgsqlParser = require('./js/plpgsqlParser.js');
const plpgsqlVisitor = require('./js/plpgsqlVisitor.js').plpgsqlVisitor;
const plpgsqlListener = require('./js/plpgsqlVisitor.js').plpgsqlListener;
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


class Visitor extends plpgsqlVisitor {

  start(ctx) {
    
    // console.log( ctx.getText() );
    
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
      code +=  this.visit(ctx.getChild(i));
    }

    return code;
  }

  /**
   * Visits a leaf node and returns a string
   *
   * @param {object} ctx
   * @returns {string}
   */
  visitTerminal(ctx) {
    
    let out = '';
    
    if ( ctx.getText() === ',' ) {
      return ',';
    }
    
    // console.log( this.depth, this.linebreak );
    
    // console.log( 'terminal');
    
    
    out += this.linebreak ? "\n" : '';
    out += ' '.repeat( this.depth );
    out += ctx.getText();
    // out += this.linebreak ? "\n" : '';
    
    // console.log( ctx.getParent().getChild() );
        // 
    return out;
  }
  
  visitColumn_list ( ctx ) {
    
    console.log('columnlist:', this.depth )
    this.depth += 2;
    let out = this.visitChildren(ctx);
    this.depth -= 2;
    console.log('/columnlist:', this.depth )
    
    return out;
  }  
  
  visitFrom_clause ( ctx ) {
    
    console.log('from:', this.depth )
    
    this.depth += 2;
    let out = this.visitChildren(ctx);
    this.depth -= 2;
    
    return out;
  }
  
  visitInto ( ctx ) {
    
    console.log('into:', this.depth );
    
    
    this.depth += 2;
    let out = this.visitChildren(ctx);
    this.depth -= 2;
    
    console.log('/into:', this.depth );
    
    return out;
  }
  
  
  visitSelect ( ctx ) {
    
    console.log('select: ', this.depth );
    
    console.log( ctx.SELECT_KEYWORD().getText() )
    
    this.linebreak = true;
    this.depth += 2;
    
    let out = this.visitChildren(ctx);
    
    this.depth -= 2;
    
    console.log('/select: ', this.depth );
    
    return ;
    // return ctx.parent();
  }  
  
  visitFrom ( ctx ) {
    
    console.log('from: ', this.depth );
    
    this.linebreak = true;
    this.depth += 2;
    
    let out = this.visitChildren(ctx);
    
    this.depth -= 2;
    
    console.log('/from: ', this.depth );
    
    return out;
  }
  

}

Visitor.prototype.depth = 0;
Visitor.prototype.linebreak = false;

const v = new Visitor();
v.visit( tree );
