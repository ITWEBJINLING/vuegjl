var router=new VueRouter({
    routes:[
        {path:'/',component:Main,
         children:[
             {path:'',components:{
                 left:left,
                 right:right
             }},
         ]
        },
        {path:'/quick',component:quick},
    ]
})