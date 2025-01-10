Ext.define('Admin.view.infoetle.InfoEtleModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.infoetle',
    
    stores: {
        results: {
            type: 'infoetle'
        }
    }

});
