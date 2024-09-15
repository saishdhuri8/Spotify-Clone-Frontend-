let songContainerList=document.querySelector(".song-container").firstElementChild;
let controls=document.querySelector(".controls").children;
let songName=document.querySelector(".song-name");
let time =document.querySelector(".time");
let circle=document.querySelector(".circle");
let cardContainer=document.querySelector(".cardcontainer");
var currentSong=new Audio();
let justSong=[];
let currentSongList=[];
var flag=false;

async function getCover(path){

    let promise= await fetch(path);
    let data = await promise.text();
    let block = document.createElement("div");
    block.innerHTML=data;
    let pic;
    let as = block.getElementsByTagName("a");
    for(let i of as ){
        if(i.href.endsWith(".jpeg"))pic=i.href;
    }
    return pic;


}

async function getFolders(){
    let promise=await fetch("http://127.0.0.1:3000/songs/");
    let data=await promise.text();
    let box=document.createElement("div");
    box.innerHTML=data;
    let f=[];
    let items=box.getElementsByTagName("a");
    let j=0;
    for(let i of items){
        if(j>0)f.push(i.href);
        j++;
    }
    
    return f;
    
}

function getFolderName(url) {
    let urlObj = new URL(url);
    let pathname = urlObj.pathname;
    let segments = pathname.split('/');
    let folderName = segments.filter(segment => segment !== '').pop();
    return folderName;
}

async function pushPlaylists(arr) {

    for(let i of arr){
        
        let pic= await getCover(i);
        let name = await getFolderName(i);
        cardContainer.innerHTML=cardContainer.innerHTML+` <div class="card">
                            <img src="${pic}" alt="">
                            <div class="greenplay">
                                <svg xmlns="http://www.w3.org/3000/svg" viewBox="0 0 24 24" width="24" height="24"
                                    color="#000000" fill="none">
                                    <path
                                        d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                                        stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <h2>${name}</h2>
                            
                        </div>`
                    }
                    

    
}
async function getSongs(folder){
   let promise=await fetch(folder);
   let data=await promise.text();
   let box=document.createElement("div");
   box.innerHTML=data;
   let x = box.getElementsByTagName("a")
   let music=[];
   for(let i of x){
      if(i.href.endsWith(".mp3")){
         music.push(i.href);
      }
   }
   currentSongList=music;
   
    return music;
}
function getSongNames(urls) {
   return urls.map(url => {
       let lastSegment = url.substring(url.lastIndexOf('/') + 1);
       let songNameWithExtension = lastSegment.split('.mp3')[0];
       let songNameDecoded = decodeURIComponent(songNameWithExtension);
       return songNameDecoded;
   });
}

function getSongName(url){
    let lastSegment = url.substring(url.lastIndexOf('/') + 1);
    let songNameWithExtension = lastSegment.split('.mp3')[0];
    let songNameDecoded = decodeURIComponent(songNameWithExtension);
    return songNameDecoded;
}

function pushNames(songNames){
songContainerList.innerHTML="";
  for(let i of songNames){

      songContainerList.innerHTML=songContainerList.innerHTML+` <li>
                            <div class="info">
                                <div class="pic">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                        color="#000000" fill="none">
                                        <path
                                            d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <circle cx="10.5" cy="19.5" r="2.5" stroke="currentColor" stroke-width="1.5" />
                                        <circle cx="20" cy="18" r="2" stroke="currentColor" stroke-width="1.5" />
                                        <path
                                            d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M13 13C17.8 13 21 10.6667 22 10" stroke="currentColor"
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div class="song-info"> 
                                    <p>${i}</p>
                                </div>
                            </div>
                            <div class="play-now">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                                    color="#000000" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                    <path
                                        d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                        fill="currentColor" />
                                </svg>
                            </div>
                        </li>`
      

  }
   
}
function listnerOnList(){
    let lists=cardContainer.querySelectorAll(".card");

    for(let i of lists){
        let name= i.querySelector("h2");
        i.addEventListener("click",async()=>{            
            let songList= await getSongs(`http://127.0.0.1:3000/songs/${name.innerHTML}/`);
            justSong=songList;
            let songNames=await getSongNames(songList);
           await pushNames(songNames);
           await applyListner(name);
        })
    }

}
 async function playMusic(track,x){
    currentSong.src="/songs/"+x.innerHTML+"/"+track+".mp3";
   await currentSong.play();
}



function applyListner(x){
let lists= songContainerList.getElementsByTagName("li");

    for(let i of lists){
        i.addEventListener("click",()=>{
            let name=  i.querySelector(".song-info").firstElementChild.innerHTML;
            controls[1].src="./Icons/pause.svg"
            songName.innerHTML=name;
            playMusic(name,x);
            flag=true;
        })
    }
}

controls[0].addEventListener("click",(e)=>{///////////////////////////////////////////////
if(flag){

    const currURLOfSong=currentSong.src
    let  i=0 ;
    for(; i<currentSongList.length;i++){
        if(currURLOfSong===currentSongList[i])break; 
    }
    if(i!=0){
        currentSong.src=currentSongList[i-1];
        songName.innerHTML=getSongName(currentSongList[i-1])
        currentSong.play();
        controls[1].src="./Icons/pause.svg"
    }
    
}    
    
    
    
    
})
controls[2].addEventListener("click",(e)=>{
 
    if(flag){

        
        const currURLOfSong=currentSong.src
        let  i=0 ;
        for(; i<currentSongList.length;i++){
            if(currURLOfSong===currentSongList[i])break; 
        }
        if(i!=currentSongList.length-1){
            currentSong.src=currentSongList[i+1];
            songName.innerHTML=getSongName(currentSongList[i+1])
            currentSong.play();
            controls[1].src="./Icons/pause.svg"
        }
        
    }
})

controls[1].addEventListener("click",(e)=>{

if(flag){

    if(currentSong.paused ){
        controls[1].src="./Icons/pause.svg"
        currentSong.play();
    }
    else{
        controls[1].src="./Icons/play.svg"
        currentSong.pause();
    }
}
})


currentSong.addEventListener('ended',()=>{
    controls[1].src="./Icons/play.svg"
})

currentSong.addEventListener("timeupdate",()=>{
    time.innerHTML=`${convertSecondsToMinutes(currentSong.currentTime)}/${convertSecondsToMinutes(currentSong.duration)}`;
    circle.style.left=`${(currentSong.currentTime/currentSong.duration)*100}%`;

})

document.querySelector(".seekbar").addEventListener("click",(e)=>{

    circle.style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100 +"%";
    currentSong.currentTime=((currentSong.duration)*(e.offsetX/e.target.getBoundingClientRect().width));
})

document.querySelector(".burger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0%";
    
})

document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-100%";
})


function convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}


async function main(){
  let folders=await getFolders();
    await pushPlaylists(folders);
   await listnerOnList();
   
}

main();






