Ext.define('Admin.store.cekinfokendaraan.CekInfoKendaraan', {
    extend: 'Ext.data.Store',

    alias: 'store.cekinfokendaraan',

    model: 'Admin.model.cekinfokendaraan.CekInfoKendaraan',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/cekinfokendaraan',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true,

    /*sorters: {
        direction: 'ASC',
        property: 'title'
    }*/
});
