var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs')

const newCall = (url)=>{

    request(`https://xvideos.com${url}`,(err, res , body)=>{
        
        var $ = cheerio.load(body);    
        $(".video-metadata").each(function(){
            let y = this.children[0].children
            let title = url.substring(31 , 250);
            let tag = "";
            for(var xy = 1 ; xy <= y.length-5 ; xy++){
                if(y[xy].next.next.hasOwnProperty("children") && y[xy].next.next != null){
                    tag += "Tag"+xy+"- " +y[xy].next.next.children[0].attribs.href.substring(6,25) + " -  \n"
                    
                }
            }
            
            
            fs.appendFile('tags.txt' , title + '\n' + tag + '\n' , (err)=>{
                if(err) throw err
                console.log("File Saved")
            });
        })
    })
    
}

request("http://www.xvideos.com" , (err, res , body)=>{// Primary function which gets the url to send to newCall() and in this url we can get the tags!
    if(err){
        console.log("erro:" + err);
    }
    var $ = cheerio.load(body);

    $('.thumb').each(function(){
        let url = this.children[0].attribs.href
        
        newCall(url);
    });
})

