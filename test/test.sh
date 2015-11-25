
# test with sending in HTML string and a pdfName
#node ../src/main '<html><h1>test with sending in html</h1></html>' test1.pdf

node ../src/main test.html test2.pdf true "{title: \'title\',body: \'body\',tags:[\'tag1\',\'tag2\',\'tag3\']}"

#node ../src/main '<html><h1>{{test}}</h1></html>' 
