const FOLDER_ID = '1a30E4C310mIRpswJ6eA1xXkKDiv5YL62';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (!data.image || !data.student || !data.teacher) {
      return json_({ok:false,error:'missing_fields'});
    }

    const match = String(data.image).match(/^data:image\/png;base64,(.+)$/);
    if (!match) return json_({ok:false,error:'invalid_image'});

    const bytes = Utilities.base64Decode(match[1]);
    const safeTeacher = String(data.teacher)
      .replace(/[\\\/:*?"<>|#%{}~]/g,'')
      .replace(/\s+/g,'_')
      .slice(0,60) || 'Teacher';

    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Riyadh', 'yyyyMMdd-HHmmss');
    const file = DriveApp.getFolderById(FOLDER_ID)
      .createFile(Utilities.newBlob(bytes,'image/png', stamp + '_' + safeTeacher + '.png'));

    return json_({ok:true,fileId:file.getId(),url:file.getUrl()});
  } catch (err) {
    return json_({ok:false,error:String(err)});
  }
}

function doGet() {
  return json_({ok:true,status:'Teacher card upload endpoint is running'});
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}