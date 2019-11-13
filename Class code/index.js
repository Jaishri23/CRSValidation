checkIfCommentsExist();
showComments();


function checkIfCommentsExist(){
  console.log("inside");
  if(localStorage.getItem("comments") == "[]"){
    console.log("hello");
    document.getElementById('comments').innerHTML="No Comments Yet!";
  }
}

makeVisible('addComment');
function makeInvisible(id){
    document.getElementById(id).style.display="none";
}
function makeVisible(id){
  document.getElementById(id).style.display="inline";
}
function showTimeAndDate(){
    var date= new Date();
     return date.getHours() + ":" + date.getMinutes() +"\t\t\t" +date.getDate() +"/" + (date.getMonth()+1) +"/"+date.getFullYear()
}

function addUserComment(){
  
    event.preventDefault();
    console.log("inside addcomment()");
   var username= document.getElementById('username').value;
    var comment= document.getElementById('comment').value;
    // Username and comment validation--TASK1
    if(username.length<5){
    alert("Username should be 5 chars");
      //return false;
     }
     else if(comment==null || comment==""){
       alert("Comment can't be empty!");
       //return false;
     }
   
  else{
    var usercomment= {
      commentId:getUniqueId(),
        username: username,
        comment:comment,
        time: showTimeAndDate(),
        likes:like(),
        dislikes:dislike()
    }
    if(localStorage.getItem('comments') == null){
        localStorage.setItem('comments', JSON.stringify([]));
        var comments=JSON.parse(localStorage.getItem('comments'));
        comments.push(usercomment);
        localStorage.setItem('comments',JSON.stringify(comments));
        console.log(comments);
        //location.reload();
        emptyComments();
        showComments();
        console.log("inside add comments");
        document.getElementById('username').value='';
        document.getElementById('comment').value='';
    }
    else{
      var comments=JSON.parse(localStorage.getItem('comments'));
      comments.push(usercomment);
      localStorage.setItem('comments',JSON.stringify(comments));  
      //location.reload();
      emptyComments();
      showComments();
      document.getElementById('username').value='';
   document.getElementById('comment').value='';
  
    }
  

  } 
  
  }
  
//Set a unique id to all comments and store them in a local storage
function getUniqueId(){
  var uniqueId;
    if(localStorage.getItem('commentId') == null){
        //initially set it to 0
      localStorage.setItem('commentId',0);
      //increment by 1 one first comment added
        uniqueId=parseInt(localStorage.getItem('commentId'))+1;
        localStorage.setItem('commentId', uniqueId);
       return uniqueId;
    }
    else
    {
     uniqueId=parseInt(localStorage.getItem('commentId'))+1;
     localStorage.setItem('commentId', uniqueId);
     return uniqueId;

    }
}
function fetchComments(){
    return JSON.parse(localStorage.getItem('comments'));
}

function emptyComments(){
 document.getElementById('comments').innerHTML='';
}

function showComments(){
    var allComments=fetchComments();
    var ul=document.getElementById('comments');

     if(allComments!= null){
// Like and dislike icon -TASK 2
    for(var i=0;i<allComments.length;i++){
            ul.innerHTML+=  "<li>"+allComments[i].username + " : \t\t\t" + allComments[i].comment+ "   -    " +allComments[i].time + "</li>" + "<button onclick=edit("+allComments[i].commentId+")>Edit</button>"+"      "+ "<button onclick=deleteComment("+allComments[i].commentId+")>Delete</button>" +"    "+'<i  onclick=like("+allComments[i].commentId+") class="fa fa-thumbs-up" aria-hidden="true"></i>'+"       "+'<span id="like">0</span>'+'<i onclick="dislike()" class="fa fa-thumbs-down" aria-hidden="true"></i>'+'<span id="dislike">0</span>';
            
    }
  }
  else
  {
   ul.innerHTML="No comments yet!!";
  }
}

function edit(commentId){
  //Confirmation Window for edit-TASK4
  var result = confirm("Are you sure to edit?");
  if(result){
    // Delete logic goes here
    event.preventDefault();
       var comment=getUserCommentById(commentId);
       console.log(comment);
       document.getElementById('username').value=comment.username;
       // Disable Username while editing message-TASK3
       document.getElementById("username").disabled = true;
       document.getElementById('comment').value=comment.comment;
       makeInvisible("addComment");
       
       var form=document.getElementById('form');
        var button=document.createElement('button');
        button.innerHTML="Update Comment";
        button.setAttribute('onclick',"updateComment("+commentId+")");
        button.id="uComment";
        form.appendChild(button);
    //makeVisible("updateComment");
}
}
  

function getUserCommentById(commentId){

  // iterate over all comments and find the respective comment by its id and return it.
  var allComments=fetchComments();
    for(var i=0;i<allComments.length;i++){
         if(allComments[i].commentId == commentId){
           return allComments[i];
         }
    }

}

function updateComment(commentId){
  event.preventDefault();
  var username= document.getElementById('username').value;
  var comment= document.getElementById('comment').value;
  //var actualComment=getUserCommentById(commentId);
  //console.log(actualComment,"ss");
   var allComments=fetchComments();
   console.log("Before",allComments);
   for(var i=0;i<allComments.length;i++){
       if(allComments[i].commentId == commentId){
         allComments[i].username= username;
         allComments[i].comment= comment;
         allComments[i].time=showTimeAndDate()
       }
   }
   localStorage.setItem('comments',JSON.stringify(allComments));
   emptyComments();
   showComments();
   document.getElementById('username').value='';
document.getElementById('comment').value='';
makeVisible('addComment');
makeInvisible('uComment');
}


function deleteComment(id){
   event.preventDefault();
   //Confirmation Window for delete-TASK4
   var result = confirm("Are you sure to delete?");
    if(result){
        // Delete logic goes here
        var allComments=fetchComments();
   console.log("Before",allComments);
   for(var i=0;i<allComments.length;i++){
       if(allComments[i].commentId == id){
            allComments.splice(i,1);
       }
   }
   console.log("After",allComments);
   localStorage.setItem('comments', JSON.stringify(allComments));
   emptyComments();
   showComments();
   checkIfCommentsExist();

}
    }

  function like(id){
    var allComments=fetchComments();
    event.preventDefault();
    if(localStorage.getItem('likes')==null){
      localStorage.setItem('likes',0);
      likes=parseInt(localStorage.getItem('likes'));
        localStorage.setItem('likes', likes);
        if(allComments!=null){
        document.getElementById('like').innerHTML=dislikes;
    }
        return likes;
        
    }
    else{
      likes=parseInt(localStorage.getItem('likes'))+1;
        localStorage.setItem('likes', likes);
        if(allComments!=null){
          document.getElementById('like').innerHTML=likes;
      }
        return likes;
        
    }
    
  }
  function dislike(id){
    var allComments=fetchComments();
    event.preventDefault();
    if(localStorage.getItem('dislikes')==null){
      localStorage.setItem('dislikes',0);
      dislikes=parseInt(localStorage.getItem('dislikes'));
        localStorage.setItem('dislikes', dislikes);
        if(allComments!=null){
        document.getElementById('dislike').innerHTML=dislikes;
    }
        return dislikes;
        
    }
    else{
      dislikes=parseInt(localStorage.getItem('dislikes'))+1;
        localStorage.setItem('dislikes', dislikes);
        if(allComments!=null){
          document.getElementById('dislike').innerHTML=dislikes;
      }
        return dislikes;
        
    }
  }

   
/*

Algorithm:

1. Create a function that generates unique comment id everytime, a new comment is added.

  function getCommentId(){
      // LOGIC to create a id and return it.
  }


  2.  Edit and delete 

   <button onclick="edit(commentId)">Edit</button>

   <button onclick= "delete(commentId)">Delete</button>

   <button onclick="save()">Save</button>

   function edit(commentId){
    // using commentId , get the comment data and update that data in to the fields.
   }

   function save(){
       //get the data and update the data in to the object in LS.
   }
*/
