const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  operationType: { type: String, required: true },
  documentKey: { type: mongoose.Schema.Types.Mixed },
  fullDocument: { type: mongoose.Schema.Types.Mixed },
  fullDocumentBeforeChange: { type: mongoose.Schema.Types.Mixed },
  namespace: {
    db: { type: String },
    coll: { type: String },
  },
  timestamp: { type: Date, default: Date.now },
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
