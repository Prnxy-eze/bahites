document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("fade-in");

    document.querySelectorAll("a").forEach(link => {

        if (link.hostname === window.location.hostname) {

            link.addEventListener("click", function (e) {

                e.preventDefault();

                document.body.classList.remove("fade-in");
                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location = this.href;
                }, 1000);

            });

        }

    });

});