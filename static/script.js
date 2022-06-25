var file = null;

function readURL(input) {
  if (input.files && input.files[0]) {                      // if input is file, files has content
    var inputFileData = input.files[0];                     // shortcut
    var reader = new FileReader();                          // FileReader() : init
    reader.onload = function(e) {                           /* FileReader : set up ************** */
      console.log('e',e) 
      $('.file-upload-placeholder').hide();                 // call for action element : hide
      $('.file-upload-image').attr('src', e.target.result); // image element : set src data.
      $('.file-upload-preview').show();                     // image element's container : show
      $('.image-title').html(inputFileData.name);           // set image's title
    };
    console.log('input.files[0]',input.files[0])
    file = input.files[0];
    reader.readAsDataURL(inputFileData);     // reads target inputFileData, launch `.onload` actions
  } else { remove(); }
}

function remove() {
  var $clone = $('.file-upload-input').val('').clone(true); // create empty clone
  $('.file-upload-input').replaceWith($clone);              // reset input: replaced by empty clone
  $('.file-upload-placeholder').show();                     // show placeholder
  $('.file-upload-preview').hide();                         // hide preview
  file = null;
  $('#show-text').text('Drag and drop a file or select add Image');
}

function upload() {
  if (file.size > 1024*10*1000000) {
    alert('max upload size is 10M');
    return;
  }
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: file,
    contentType: false,
    processData: false,
    success: function(response){
      if(response != 0){
        $('.file-upload-result').show();
        $('.result-text').attr("value", response);
        // alert('图片地址：' + response)
        $('.hide-image').attr('src', response);
      }else{
        alert('file not uploaded');
      }
      remove();
    },
  });
  remove();
  $('#show-text').text('上传中，请稍候...');
  $('.file-upload-result').hide();
  $('.result-text').attr("value", "");
}

// Style when drag-over
$('.file-upload-placeholder').bind('dragover', function () {
  $('.file-upload-placeholder').addClass('image-dropping');
});
$('.file-upload-placeholder').bind('dragleave', function () {
  $('.file-upload-placeholder').removeClass('image-dropping');
});