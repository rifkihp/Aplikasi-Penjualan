Ext.define('Admin.store.infokendaraan.InfoKendaraan', {
    extend: 'Ext.data.Store',

    alias: 'store.infokendaraan',

    model: 'Admin.model.infokendaraan.InfoKendaraan',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/infokendaraan',
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
