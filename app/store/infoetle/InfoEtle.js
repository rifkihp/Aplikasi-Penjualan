Ext.define('Admin.store.infoetle.InfoEtle', {
    extend: 'Ext.data.Store',

    alias: 'store.infoetle',

    model: 'Admin.model.infoetle.InfoEtle',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/infoetle',
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
