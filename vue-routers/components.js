var Main=Vue.component("Main",{
        template:`
        <div class="components">
        <div class="body">
            <div class="left">
                 <router-view name="left"></router-view>
            </div>
            <div class="right">
                 <router-view name="right"></router-view>
            </div>
         </div>
        </div>
        `
})
var left=Vue.component("Menu",{
    data(){
        return {
            menu: [
            ]
        }
    },
    computed:{
        data(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    created(){
      fetch("./demo.txt").then(function (e) {
          return e.json();
      }).then((e)=>{
          this.menu=e;
      })
    },
        template:`
        <div>
            <ul>
                 <div v-for="item in data">
                      <li><router-link :to="'#'+item.id">{{item.title}}</router-link></li>
                      <ul v-for="item1 in item.child">
                          <li><router-link :to="'#'+item1.id">{{item1.title}}</router-link></li>
                      </ul>
                 </div>
            </ul>
        </div>
        `,
    watch:{
        $route(){
            var num=(this.$route.hash.slice(1));
            var pos=(document.querySelector("#a"+num).offsetTop)-80;
            console.log(pos);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({number:pos }, 500)
                .onUpdate(function () {
                   document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate();
        }
    }
})
var right=Vue.component("Menu",{
    data(){
        return {
            data:"",
        }
    },
    template:`
        <div class="markdown-body">
        <div v-html="data">
           
        </div>
        </div>
        `,
    mounted(){
        fetch("./doc.txt").then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data=e;
        })
    }
})

var quick=Vue.component("quick",{
    template:`
    <div class="quick">
       <h2>你好！</h2><br><br><br>
       <span>欢迎来到快速入门入口！</span>
    </div>
    `
})