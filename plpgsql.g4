grammar plpgsql;

root: (statement)* EOF;

statement: 
  stmt_select SEMICOLON;
  

stmt_select:    
  select                   
  into?
  from?
  order?
  limit?;

select: SELECT_KEYWORD column_list?;


limit:
  LIMIT INTEGER;

order:
  ORDER_BY expr_list ( ASC | DESC );

into:
  INTO column_list;
  

from
  : FROM expr table_alias?
  ;

function_call       : FQ_IDENTIFIER '(' expr_list ')' ;

column_list:
  expr column_alias? ( COMMA expr column_alias?)*;
    
expr_list
  : expr 
    ( COMMA expr)*;


expr
  : FQ_IDENTIFIER
  | function_call
  | subselect
  | number;
    
subselect
  : '(' stmt_select ')';
  
column_alias
  : AS? FQ_IDENTIFIER;

table_alias
  : AS? FQ_IDENTIFIER ( '(' expr_list ')' )?;
    

number
  : INTEGER
  | FLOAT;

SELECT_KEYWORD      : S E L E C T;
FROM                : F R O M;
AS                  : A S;
INTO                : I N T O;
ORDER_BY            : O R D E R WHITESPACE B Y;
ASC                 : A S C;
DESC                : D E S C;
LIMIT               : L I M I T;

SEMICOLON           : ';'; 
COMMA               : ','  ;

FQ_IDENTIFIER       : (IDENTIFIER '.')? IDENTIFIER;
IDENTIFIER          : ( LOWERCASE | UPPERCASE | '_' ) (LOWERCASE | UPPERCASE | '_' | DIGIT )* ;


NEWLINE             : ('\r'? '\n' | '\r')+ -> skip;
WHITESPACE          : (' ' | '\t')+ -> skip;


INTEGER             : DIGIT+;
FLOAT               : DIGIT+ ([.] DIGIT+) ;

STAR                : '*';

// Fragments
fragment A          : ('A'|'a') ;
fragment B          : ('B'|'b') ;
fragment C          : ('C'|'c') ;
fragment D          : ('D'|'d') ;
fragment E          : ('E'|'e') ;
fragment F          : ('F'|'f') ;
fragment G          : ('G'|'g') ;
fragment H          : ('H'|'h') ;
fragment I          : ('I'|'i') ;
fragment J          : ('J'|'j') ;
fragment K          : ('K'|'k') ;
fragment L          : ('L'|'l') ;
fragment M          : ('M'|'m') ;
fragment N          : ('N'|'n') ;
fragment O          : ('O'|'o') ;
fragment P          : ('P'|'p') ;
fragment Q          : ('Q'|'q') ;
fragment R          : ('R'|'r') ;
fragment S          : ('S'|'s') ;
fragment T          : ('T'|'t') ;
fragment U          : ('U'|'u') ;
fragment V          : ('V'|'v') ;
fragment W          : ('W'|'w') ;
fragment X          : ('X'|'x') ;
fragment Y          : ('Y'|'y') ;
fragment Z          : ('Z'|'z') ;

fragment LOWERCASE  : [a-z] ;
fragment UPPERCASE  : [A-Z] ;

fragment DIGIT      : [0-9] ;
