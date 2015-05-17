jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    $.getJSON("https://api.github.com/users/DeekshithShetty/repos", function(result){
        $.each(result, function(i, field){
            //if(result[i].description !== ""){
                var $divMain = $("<div>",{ class : "item row"});

                var $aImg = $("<a>",{ class : "col-md-4 col-sm-4 col-xs-12" , target : "_blank" });
                    var $img  = $("<img>",{ class : "img-responsive project-image" });

                    var imagePath = "./assets/images/image_not_available.png";
                    var contentUrl = result[i].contents_url;
                    contentUrl = contentUrl.split("{");
                    $.getJSON(contentUrl[0], function(result){
                        $.each(result, function(i, field){
                            if(result[i].name == "project.png"){
                                imagePath = result[i].download_url;
                                $img.attr("src",imagePath);
                            }
                        });
                    });       
                    $img.attr("src",imagePath);
                $aImg.append($img);

                var $divIn = $("<div>",{ class : "desc col-md-8 col-sm-8 col-xs-12" });

                    var $h3 = $("<h3>",{ class : "title" });
                        var $aH3 = $("<a>",{ target : "_blank" });

                        var projectName = result[i].name;
                        function splitProjectName(){
                            var ret; 
                            var string = projectName.split("-");
                            ret = string.join(" ");

                            while(ret === undefined){}
                            $aH3.append(ret.toString());
                        }
                        splitProjectName();
          
                    $h3.append($aH3);

                    var $p = $("<p>");
                    $p.append(result[i].description)

                    var $pGit = $("<p>");
                        var $aGit = $("<a>",{ class : "more-link" ,target : "_blank" });
                        $aGit.attr("href",result[i].html_url);
                        var $i = $("<i>",{ class : "fa fa-external-link" });
                        //$aGit.append(<i class="">);
                        $aGit.append($i);
                        $aGit.append("View on Github")
                    $pGit.append($aGit);

                $divIn.append($h3); 
                $divIn.append($p);
                $divIn.append($pGit);

            $divMain.append($aImg); 
            $divMain.append($divIn);

            $("#projectContainer").append($divMain);
           // }           
        });
    });


    

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    $("#rss-feeds").rss(
    
        //Change this to your own rss feeds
        "http://feeds.feedburner.com/TechCrunch/startups",
        
        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,
        
        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',
        
        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='item'>{entries}</div>",
        
        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fa fa-external-link"></i>Read more</a></div>'
        
        }
    );
    
    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "DeekshithShetty", selector: "#ghfeed" });


});