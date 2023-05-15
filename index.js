$(document).ready(()=>{
    const pop =  '<div class="popup"> </div>'
    const body = $("body")
    const menuList = [ 
        {   
            "img": "1.webp",
            "title": "About Us",
            "sub": [],
            "photo":"1.jpg"
        },
        
        {
            "img": "2.webp",
            "title": "Product",
            "sub":[],
            "photo":"2.jpg"
        },
        {
            "img": "3.webp",
            "title": "Help!",
            "sub":[],
            "photo":"3.jpg"

        }
        
        ]
    const photoList =[
        ["1.jpg","2.jpg","3.jpg","4.jpg"],
        ["5.jpg","6.jpg","7.jpg","8.jpg"],
        ["9.jpg","10.jpg","11.jpg","12.jpg"],
        ["13.jpg","14.jpg","15.jpg","16.jpg"],
        ["1.jpg","2.jpg","3.jpg","4.jpg"],
        ["5.jpg","6.jpg","7.jpg","8.jpg"],
        ["9.jpg","10.jpg","11.jpg","12.jpg"],
        ["13.jpg","14.jpg","15.jpg","16.jpg"],
    ]
    const cityList = [
      {
        name: "Phnom Penh",
        subData: [
          {
            name:"Toul Kork",
            subData: [ { name: "Tk1"},{ name: "Tk2",}]
          },
          {
           name:"Berng KangKong",
           subData:[{name:"Bkk1"},{name:"Bkk2"}] 
          }
                ]
      },
      {
        name: "Siem Reap",
        subData: [
          {
            name:"Berng Kilo",
            subData: [ { name: "Bkl1"},{ name: "Bkl2",}]
          },
          {
           name:"Pub Street",
           subData:[{name:"St1"},{name:"St2"}] 
          }
                ]
      },
    ];
    //get city district and commnue
    var txt=`<option value="-1">---Select one item---</option>`
    cityList.map((e,i)=>{
        txt +=`
        <option value="${i}">${e["name"]}</option>
        `
    })
    $("#city").html(txt)
    var cityInd
    $("#city").change(function(){
         cityInd = $(this).val()
        if(cityInd==-1){
            $("#district").empty()
            $("#commnue").empty()
            return
        }
        var subData = cityList[cityInd]['subData']
        var txt=` <option value="-1">---Select one item---</option>`
        subData.map((e,i)=>{
            txt +=`
                <option value="${i}">${e['name']}</option>
            `
        })
        $("#district").html(txt)
        $("#commnue").empty()
    })
    $("#district").change(function(){
        var ind2 = $(this).val()
        if(ind2==-1){
            $("#commnue").empty()
            return
        }
        var SubData = cityList[cityInd]['subData'][ind2]['subData'];
        var txt = ` <option value="-1">---Select one item---</option>`
        SubData.map((e,i)=>{
            txt +=`
                <option value="${i}">${e['name']}</option>
            `
        })
        $("#commnue").html(txt)
    })
    // double loop photo get photolist
     var txt =""
    // two function photo get photolist
    const subPhoto = (subPhoto2)=>{
        var txt2 =""
        //loop subPhoto2
        subPhoto2.forEach((e)=>{
            txt2 +=`
                <div class="box">
                    <img src="${e}" alt="">
                </div>
            `
        })
        return txt2 // return txt2 to subPhoto above
    }
    const myPhoto = photoList.forEach((e)=>{
        // var txt2 = ""
        // e.map((e2)=>{
        //     txt2 +=`
        //     <div class="box">
        //         <img src="${e2}" alt="">
        //     </div>
        //     `;
        // })
        txt += `
            <div class="col-xxl-3 col-xl-3 col-lg-3 cover-box-container">
                <div class="box-container">
                    ${subPhoto(e)}
                </div>
            </div>
        `;
    })
    $("#photo-container").html(txt)
    
          // get slides 
    var currentSlide = 1;
    const getSlides = ()=>{
        var txt =""
        var txt2 =""
        menuList.map((e) => {
            txt  +=`
                <div class="box-slide">
                    <img src="${e["img"]}" alt="">
                    <div class="countNum"> ${currentSlide} / ${menuList.length} </div>
                </div>
                
              `
              txt2 +=`
                <li>${currentSlide}</li>
               `;
            currentSlide++
            
        })
               
        $(".slide-bar").find(".pageination ul").html(txt2)
        $(".slide-bar").append(txt)
    }
    getSlides()   

    const slideEl = $(".box-slide")
    var sumSlide = slideEl.length
    var slideind = 0
    slideEl.hide()
    slideEl.eq(slideind).show()
    //active slide
    $(".pageination").find("ul li").eq(slideind).addClass("active")
    //auto slides
    const nextslides = ()=>{
        $(".right-slide").click()
    }
    var myAutoSlides = setInterval(nextslides,3000)
    // clear next slide
    $(".slide-bar").mouseover(()=>{
        clearInterval(myAutoSlides)
    })
    $(".slide-bar").mouseout(()=>{
        myAutoSlides = setInterval(nextslides,3000)
    })
    //pageination
   $(".pageination").on("click","ul li",function(){
    var j = $(this).index()
    slideEl.eq(slideind).hide()
    $(".pageination").find("ul li").eq(slideind).removeClass("active")
    slideind = j
    slideEl.eq(slideind).show()
    $(".pageination").find("ul li").eq(slideind).addClass("active")
   
   })
   // next slide
   $(".right-slide").click(()=>{
        slideEl.eq(slideind).hide()
        $(".pageination").find("ul li").eq(slideind).removeClass("active")
        slideind ++
        if(slideind >= sumSlide){
            slideind =0
        }
        slideEl.eq(slideind).show()
        $(".pageination").find("ul li").eq(slideind).addClass("active")
        
       
    })
    //back slide
    $(".left-slide").click(()=>{
        slideEl.eq(slideind).hide()
        $(".pageination").find("ul li").eq(slideind).removeClass("active")
        slideind --
        if(slideind <0){
            slideind = sumSlide-1
        }
        slideEl.eq(slideind).show()
        $(".pageination").find("ul li").eq(slideind).addClass("active")
    })
    getMenu2()
    function getMenu2(){
        var txt=""
        menuList.forEach((e,i)=>{
            txt +=`
            <li class="li-1" data-ind="${i}"><a href="#"><span>${e["title"]}</span><i class="fas fa-plus"></i></a>
                
            </li>
            `
        })
        $(".menu-2").find("ul").html(txt);
    }
    //get sub-menu-2
    $(".menu-2").on("click","ul .li-1",function(){
        var eThis = $(this)
        if(eThis.find(".sub-menu-2").length>0){
            if(eThis.find(".fa-minus").length>0){
                eThis.find(".sub-menu-2").slideUp()
                eThis.find("i").addClass("fa-plus")
                eThis.find("i").removeClass("fa-minus")
            }else{
                eThis.find(".sub-menu-2").slideDown()
                eThis.find("i").addClass("fa-minus")
                eThis.find("i").removeClass("fa-plus")
            }
            return
        }
        var ind = eThis.data("ind")
        var sub = menuList[ind]['sub']
        var txt =""
        sub.forEach((e)=>{
            txt +=`
             <li><a href="#"> ${e}</a></li>
            `
        })
        eThis.append(`<ul class="sub-menu-2">${txt}</ul>`)
        eThis.find("i").removeClass("fa-plus")
        eThis.find("i").addClass("fa-minus")
    })  
    const subMenu = (e2)=>{
        txt2 ='';
        e2.forEach((e)=>{
            txt2+=`
            <li><a href="#"> ${e}</a></li>
            `
        })
        
        return txt2
    }    
    getMenuBar()
    function getMenuBar(){
        var txt =''
        var txt3 =''
        menuList.forEach( (e)=>{
            var e2 = e["sub"]
            // console.log(subMenu);
            var txt2 =""
            // subMenu.forEach((e2)=>{
            //     txt2+=`
            //         <li><a href="#">${e2}</a></li>
            //     `
            // })
            txt +=`
            <li><a href="#">${e["title"]}</a>
                            <ul class="sub-menu">
                                ${subMenu(e2)}
                            </ul>
            </li>
            `;
            txt3+=`
            <li><a href="#">Home</a></li>
            `;
        })
        // console.log(txt)
          $(".menu").find('ul').append(txt)
          $(".left-menu").find("ul").append(txt3)
    }
    //btn left-menu
    $(".btn-menu").click(()=>{
        //append popup to body html
        body.append(pop)
        $(".left-menu").css({"left":"0"})
    })
    //remove popup
    $("body").on("click",".popup",function(){
        $(this).remove()
        $(".left-menu").css({"left":"-300px"})
    });
    //call img to albums 
    var txt = ""
    photoList.forEach(function(e){
        txt += `
            <div class="col-xxl-12 col-xl-12 col-lg-12 popup-img">
                    
                <div class="popup-box">
                    <img src="" alt="">
                    
                </div>
                <i class="fa-sharp fa-solid fa-circle-xmark fa-2x close"></i>
             </div>
        `;  
    })
    $("#albums").html(txt)

    //   click albums 
       $(".box").click(function(){
        var eThis =$(this)
        var img = eThis.find("img").attr("src") 
        $(".popup-img").css({"visibility":"visible"})
        $(".popup-img img").attr('src',img)
    })
    
    
    // remove albums
    $(".close").click(function(){
        $(".popup-img").css({"visibility":"hidden"})
    })
    //get friends list 
    const friendList = (function(){
        var txt=''
        menuList.forEach((e,i)=>{
            txt +=`
                <li id="chat${i}">
                    <img src="${e["photo"]}" alt="">
                    <span>${e["title"]}</span>
                </li>
            `
        })
        $(".friend-lis-box").find("ul").html(txt)
    })
    friendList ()
    // hide friend list box
    $(".friend-lis-box").on("click",'h1',function(){
        var Ethis = $(this)
        if(Ethis.parent().innerHeight() == 35){
            Ethis.parent().css({"height":"400px"}) 
            $(".friend-lis-box").css({"overflow":"scroll"})
            $("h1").css({"background-color":"#000"})
        }else{
            Ethis.parent().css({"height":"35"})
            $(".friend-lis-box").css({"overflow":"hidden"})
            $("h1").css({"background-color":"green"})
        }
      
    })
    // add chat 
    const chatContainer = $(".chat-container")
    $(".friend-lis-box").on("click",'ul li',function(){
        var eThis = $(this)
        var title = eThis.find("span").text()
        var img = eThis.find("img").attr("src")
        var id = eThis.attr('id')
        var frm =  `
        <div class="chat-box" id="${id}">
             <div class="header">
                <img src="${img}" alt="">
                <span>${title}</span>
                <i class="fas fa-times close-btn" style="right: 10px; top: 15px; color: white;"></i>
            </div>
        </div>
        `
        chatLength =chatContainer.find("#"+id).length
        if(chatLength==0){
            if(chatContainer.find(".chat-box").length == 3){
                chatContainer.find(".chat-box").eq(0).remove();
            }
            chatContainer.append(frm)
        }
        
        
    })
    chatContainer.on("click",'.chat-box .header .close-btn',function(){
        $(this).parents(".chat-box").remove()
    })
})
