/* create new FS collection and indicate where you want to store 
your uploads after the  "path:" variable */

var Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "uploads"})]

});

if (Meteor.isClient) {
  
Template.imagesSubmitted.helpers({
   images: Images.find() 
    
});
    
/*double click to remove the image*/    
Template.imagesSubmitted.events({
   
'dblclick .previewImage': function(e){
 
    Images.remove({_id:this._id});
    
}
    
});

/*Upload event*/
    
Template.main.events({

'change #myFileInput': function(event, template) {
    event.preventDefault();
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
         
    });
        
  }   
    
    
});
    
    
    
    
}
