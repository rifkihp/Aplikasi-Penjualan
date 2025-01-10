Ext.define('Admin.model.infoetle.InfoEtle', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'nomor_polisi'
        },
        {
            type: 'string',
            name: 'domisili'
        },
        {
            type: 'string',
            name: 'nama_pemohon'
        },
        {
            type: 'string',
            name: 'waktu_permintaan'
        },
        {
            type: 'string',
            name: 'waktu_tayang'
        }, 
        {
            type: 'bool',
            name: 'status'
        }
    ]
});