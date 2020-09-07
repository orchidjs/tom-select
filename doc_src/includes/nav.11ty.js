
module.exports = function({collections}) {
	return `
		<h2><a href="/">Orchid Select</a></h2>
  		<ul>
			${collections.demo.map((post) => `<li>${ post.data.title }</li>`).join("\n")}
		</ul>


		`;
};

/*

	<h3 class="mt-4 mb-2">Examples</h3>

	<nav class="nav flex-column">
	{%- for demo in collections.demo -%}
		<a class="nav-link px-0 {% if page.url == demo.url %} active{% endif %}" href="{{ demo.url }}">{{ demo.data.title }}</a>
	{%- endfor -%}
	</nav>


	<h3 class="mt-4 mb-2">Documentation</h3>
	<nav class="nav flex-column">
		<a class="nav-link px-0" href="/usage">Usage Documentation</a>
		<a class="nav-link px-0" href="/api">API Documentation</a>
		<a class="nav-link px-0" href="/plugins">Plugin Documentation</a>
		<a class="nav-link px-0" href="/events">Events</a>
		<a class="nav-link px-0" href="/selectize">Selectize Comparison</a>

	</nav>

	<div class="mt-auto py-5">
		<a href="https://github.com/orchidjs/orchid-select/doc_src/blob/master/{{ page.inputPath }}">Edit this page on GitHub</a>
		<div class="mt-3">© 2020 OrchidJS</div>
	</div>
*/
