let transition_from_lost = {
    name: 'from-lost',
    leave: () => true,
    before: function (data) {
        let done = this.async();

        // Display loading
        loader.init();

        // Hide current view
        // Image loading logic
        animate.hide404(data.current.container, () => loader.show(data.next.container, () => done()));
    },
    // Animate current view
    enter: function (data) {
        let done = this.async();

        animate.show(data.next.container, () => done());
    },
    after: function () {
        // Remove loading
        loader.empty();

        return true;
    },
    from: {
        namespace: ['lost']
    }
}