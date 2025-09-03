function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle("لوحة البيانات")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// جلب البيانات من الشيت
function getSalesData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Responses: نموذج التقديم للوظيفة");
  if (!sheet) throw new Error("❌ Sheet not found");

  const data = sheet.getDataRange().getValues();
  data.shift(); // إزالة الصف الأول (Headers)

  return data.map(r => ({
    timestamp: r[0],         // A
    fullName: r[1],          // B
    gender: r[2],            // C
    dob: r[3],               // D
    nationality: r[4],       // E
    idNumber: r[5],          // F
    phone: r[6],             // G
    email: r[7],             // H
    address: r[8],           // I
    maritalStatus: r[9],     // J
    education: r[10],        // K
    specialization: r[11],   // L
    previousExperience: r[12], // M
    currentJob: r[13],       // N
    expectedSalary: r[14],   // O
    cvLink: r[15]            // P
  }));
}

// إضافة سجل جديد
function addNewRecord(record) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Responses: نموذج التقديم للوظيفة");

  sheet.appendRow([
    new Date(),                   // A: Timestamp
    record.fullName || "",        // B
    record.gender || "",          // C
    record.dob || "",             // D
    record.nationality || "",     // E
    record.idNumber || "",        // F
    record.phone || "",           // G
    record.email || "",           // H
    record.address || "",         // I
    record.maritalStatus || "",   // J
    record.education || "",       // K
    record.specialization || "",  // L
    record.previousExperience || "", // M
    record.currentJob || "",      // N
    record.expectedSalary || "",  // O
    record.cvLink || ""           // P
  ]);

  return "✅ تم حفظ البيانات بنجاح!";
}
