<?php include_once './template/head.php'; ?>
<div id="wrapper">
    <?php include_once './template/sidebar.php'; ?>
    <!-- Isi konten -->
    <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <!-- TopBar -->
                <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                    <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user-circle fa-2x"></i>
                                <span class="ml-2 d-none d-lg-inline small font-weight-bold">LoL Human</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- Topbar -->

                <!-- Container Fluid-->
                <div class="container-fluid" id="container-wrapper">
                    <div class="card h-50 mb-4">
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col mr-2">
                                    <div class="text-md-left font-weight-bold mb-2 text-primary">Daftar Usefull Api
                                        Roidev</div>
                                    <div class="text-sm-left mb-0 font-weight-bold">Ini adalah implementasi web dari
                                        fitur Bot Whatsapp <a href="https://t.me/LoLHumen" target="_blank">Hinami
                                            Bot.</a>
                                        Yang menggunakan referensi API dari koleksi Public api <a href="https://api.lolhuman.xyz/"
                                            target="_blank" rel="noopener noreferrer">LoL Human</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card h-50">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-uppercase mb-1">Visitor</div>
                                            <div class="h5 mb-0 font-weight-bold">Downloader</div>
                                        </div>
                                        <div class="col-auto">
                                            <span class="material-symbols-outlined text-primary">
                                                download
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Earnings (Annual) Card Example -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card h-50">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-uppercase mb-1">Visitor (Unique)
                                            </div>
                                            <div class="h5 mb-0 font-weight-bold">{{ unique }}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-user-ninja fa-2x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- New User Card Example -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card h-50">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-uppercase mb-1">Requests</div>
                                            <div class="h5 mb-0 font-weight-bold">{{ requests }}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-shopping-cart fa-2x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card h-50">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-uppercase mb-1">Requests (Today)
                                            </div>
                                            <div class="h5 mb-0 font-weight-bold">{{ today_req }}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-calendar fa-2x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Row-->
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            Developer
                            <p class="my-3">
                                <a href="https://trakteer.id/LoLHuman" class="btn btn-primary btn-sm mr-2"
                                    target="_blank"><i class="fab fa-fw fa-github"></i>&nbsp;Roynaldi</a>
                                <a href="https://paypal.me/LoLHuman" class="btn btn-primary btn-sm ml-2"
                                    target="_blank"><i class="fab fa-fw fa-github"></i>&nbsp;LolHuman</a>
                            </p>
                        </div>
                    </div>
                </div>
                <!---Container Fluid-->
            </div>
        </div>
    </div>
    <?php include_once './template/footer.php'; ?>

