
	<!-- MENU Start
    ================================================== -->

	<nav class="navbar navbar-default">
		<div class="container">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		    </div> <!-- End of /.navbar-header -->

		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      	<ul class="nav navbar-nav nav-main">
		        	 <li class=<?php if($_GET['view']== "main"){ echo "active";}else{ echo "";}?>>
                  <a href="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/home/view">HOME</a></li>
                  
                  <li class=<?php if($_GET['view']=='shop'){echo 'active';}else{ echo "";}?>>
                  <a href="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/shop/view">SHOP</a></li>
                  
                <li class=<?php if($_GET['module']=='products'){echo 'active';}else{ echo "";}?>>
                  <a href="https://fw-php-mvc-oo-js-jquery-alcaraz12.c9users.io/FW-PHP-MVC-OO-JS-JQuery/productes/crear">CREATE PRODUCTS</a></li>
                  
					<li><a href="blog.html">BLOG</a></li>
					<li><a href="blog-single.html">ARTICLE</a></li>
					<li class="dropdown">
						<a href="#">
							PAGES
							<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
						   <li><a  href="#">Action</a></li>
						    <li><a  href="#">Another action</a></li>
						    <li><a  href="#">Something else here</a></li>
						    <li><a  href="#">Separated link</a></li>
						</ul>
					</li> <!-- End of /.dropdown -->

					
		        </ul> <!-- End of /.nav-main -->
		    </div>	<!-- /.navbar-collapse -->
		</div>	<!-- /.container-fluid -->
	</nav>	<!-- End of /.nav -->