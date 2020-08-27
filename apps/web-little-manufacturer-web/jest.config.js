module.exports = {
  name: 'web-little-manufacturer-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/web-little-manufacturer-web',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
