var mongoose = require('mongoose');

var PaintingSchema = mongoose.Schema(
  {
    data: String,
    artist: String
  },
  {
    timestamps: true
  }
);

mongoose.model('Painting', PaintingSchema);
