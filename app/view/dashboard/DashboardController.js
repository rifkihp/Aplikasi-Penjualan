Ext.define('Admin.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    requires: [
        'Ext.util.TaskRunner'
    ],

    onRefreshToggle: function(tool, e, owner) {
        var store, runner;

        if (tool.toggleValue) {
            this.clearChartUpdates();
        } else {
            store = this.getStore('networkData');

            if (store.getCount()) {
                runner = this.chartTaskRunner;

                if (!runner) {
                    this.chartTaskRunner = runner = new Ext.util.TaskRunner();
                }

                runner.start({
                    interval: 200,
                    run: function () {
                        // Move the first record to the end
                        var rec = store.first();
                        console.log('runnninf');
                        store.remove(rec);
                        store.add(rec);
                    }
                });
            }
        }

        // change the toggle value
        tool.toggleValue = !tool.toggleValue;
    },

    clearChartUpdates : function() {
        this.chartTaskRunner = Ext.destroy(this.chartTaskRunner);
    },

    destroy: function () {
        console.log('onDestroy!');
        this.clearChartUpdates();
        this.callParent();
    },

    onHideView: function () {
        console.log('onHidden!');
        this.clearChartUpdates();
    }
});
