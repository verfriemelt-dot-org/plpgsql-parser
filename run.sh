java -cp ~/Downloads/antlr-4.7.2-complete.jar org.antlr.v4.Tool plpgsql.g4 -o java

javac out/*.java

java -cp ~/Downloads/antlr-4.7.2-complete.jar org.antlr.v4.Tool -Dlanguage=JavaScript -visitor -o js plpgsql.g4

(cd java && java -cp ~/Downloads/antlr-4.7.2-complete.jar org.antlr.v4.gui.TestRig plpgsql root -tokens ../input )
(cd java && java -cp ~/Downloads/antlr-4.7.2-complete.jar org.antlr.v4.gui.TestRig plpgsql root -gui ../input )
