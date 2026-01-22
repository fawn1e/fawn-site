<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fawn Site</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    <style>
        /* Сброс стилей и настройки фона (как рабочий стол) */
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            /* Neumorphism фон - тёмный */
            background: #561C24;
            font-family: 'Nunito', sans-serif;
            overflow: hidden;
        }

        /* Vintage Grain Overlay (Эффект бумаги) */
        .grain-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
            opacity: 0.2;
            mix-blend-mode: multiply;
        }

        /* Основной контейнер - окно Safari */
        .safari-window {
            width: 95%;
            max-width: 1300px;
            height: 92vh;
            background-color: #E8D8C4;
            border-radius: 12px;
            box-shadow: 9px 9px 18px #3d1419, -9px -9px 18px #7f2530;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative; /* Для позиционирования блюра */
            border: none;
        }

        /* Верхняя панель (Toolbar) */
        .safari-header {
            background-color: #C7B7A3; /* Теплый беж */
            height: 50px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            border-bottom: 1px solid #B5A393;
            gap: 20px;
        }

        /* Кнопки управления окном (Светофор) */
        .window-controls {
            display: flex;
            gap: 8px;
        }

        .control-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .red { background: #6D2932; border: 1px solid #561C24; }
        .yellow { background: #C7B7A3; border: 1px solid #B5A393; }
        .green { background: #E8D8C4; border: 1px solid #D4C6B0; }

        /* Кнопки навигации */
        .nav-controls {
            display: flex;
            gap: 15px;
            color: #561C24;
            font-size: 16px;
        }

        /* Адресная строка */
        .address-bar {
            flex: 1;
            height: 30px;
            background: #C7B7A3;
            border-radius: 6px;
            border: none;
            box-shadow: inset 2px 2px 5px #a89885, inset -2px -2px 5px #dcc9ba;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #561C24;
        }

        .lock-icon {
            font-size: 12px;
            margin-right: 8px;
        }

        /* Область контента */
        .content-area {
            flex: 1;
            background: #E8D8C4;
            overflow-y: auto;
            position: relative;
            padding-bottom: 100px;
            color: #561C24;
        }

        /* Floating DockStyles - Neumorphism */
        .floating-dock {
            position: fixed;
            bottom: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: #C7B7A3;
            border-radius: 50px;
            padding: 12px 16px;
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            box-shadow: 6px 6px 14px #a89885, -6px -6px 14px #dcc9ba;
            border: none;
            z-index: 1000;
        }

        .floating-dock::before {
            display: none;
        }

        .dock-item {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            background: #C7B7A3;
            position: relative;
            text-decoration: none;
            color: #561C24;
            box-shadow: 3px 3px 7px #a89885, -3px -3px 7px #dcc9ba;
            border: none;
            z-index: 1;
        }

        .dock-item:hover {
            transform: scale(1.15) translateY(-10px);
            box-shadow: 3px 3px 7px #a89885, -3px -3px 7px #dcc9ba;
            background: #C7B7A3;
        }

        .dock-item.active {
            box-shadow: inset 3px 3px 7px #a89885, inset -3px -3px 7px #dcc9ba;
            background: #C7B7A3;
        }

        .dock-item svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 1.5;
            fill: none;
        }

        .dock-item svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 1.5;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .dock-item img {
            width: 28px;
            height: 28px;
            object-fit: contain;
        }

        .dock-label {
            position: absolute;
            bottom: -22px;
            left: 50%;
            transform: translateX(-50%);
            background: #561C24;
            color: #E8D8C4;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 500;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        .dock-item:hover .dock-label {
            opacity: 1;
        }

        /* Tweet Component */
        .tweet-card {
            background: #E8D8C4;
            border-bottom: 1px solid #D4C6B0;
            padding: 16px;
            box-shadow: none;
            cursor: pointer;
            max-height: 180px; /* Высота увеличена, чтобы влезли действия */
            overflow: hidden;
            transition: all 0.5s ease-in-out;
            opacity: 1;
        }

        .tweet-header {
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }

        .tweet-avatar img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #D4C6B0;
            box-shadow: none;
        }

        .tweet-main {
            flex: 1;
        }

        .tweet-author {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tweet-author-info {
            display: flex;
            flex-direction: column;
        }

        .tweet-author-name {
            font-weight: 700;
            color: #561C24;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .tweet-author-handle {
            font-size: 0.9rem;
            color: #6D2932;
        }

        .tweet-icon {
            font-size: 1.2rem;
            color: #6D2932;
        }

        .tweet-body {
            margin-top: 8px;
            font-size: 0.9rem;
            line-height: 1.5;
            color: #561C24;
            display: block; /* Тело всегда есть, обрезается родителем */
        }
        
        /* Ограничиваем текст в закрытой карточке, чтобы влезли кнопки */
        .tweet-card:not(.active) .tweet-body {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .tweet-list {
            list-style: none;
            padding: 0;
            margin: 6px 0;
        }

        .tweet-list li {
            position: relative;
            padding-left: 20px;
            margin-bottom: 6px;
        }

        .tweet-list li::before {
            content: '✦';
            position: absolute;
            left: 0;
            color: #6D2932;
        }

        .verified-icon {
            color: #561C24;
            font-size: 0.9em;
        }

        /* Действия под твитом */
        .tweet-actions {
            display: flex;
            justify-content: space-around;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #D4C6B0;
        }

        .action-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            color: #6D2932;
            cursor: pointer;
            transition: color 0.2s ease;
        }

        .action-item:hover {
            color: #561C24;
        }
        .action-item:hover .fa-heart { color: #e0245e; }
        .action-item:hover .fa-retweet { color: #17bf63; }

        /* Remove border from the last card in the feed */
        .tweet-card:last-child {
            border-bottom: none;
        }

        /* --- Система раскрывающихся карточек --- */

        /* Контейнер для карточек */
        .card-list {
            display: flex;
            flex-direction: column;
            border: 1px solid #D4C6B0;
            border-radius: 0;
            border-top: none; /* Соединяем с навигацией */
            width: 100%;
            max-width: 100%;
        }

        /* Заголовок в свернутом виде */
        .card-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #561C24;
            font-family: 'Playfair Display', serif; /* Элегантный шрифт */
            margin-top: 12px;
        }

        /* Затемнение фона */
        .card-overlay {
            display: none; /* Больше не используется */
        }

        /* Стили для активной (раскрытой) карточки */
        .tweet-card.active {
            max-height: 550px; /* Высота раскрытой карточки */
            cursor: default;
            overflow-y: auto;
            /* Скрытие скроллбара */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE и Edge */
        }
        .tweet-card.active::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }

        .tweet-card.active .card-title {
            display: none; /* Скрываем заголовок в раскрытом виде */
        }

        .tweet-card.hidden {
            max-height: 0;
            padding-top: 0;
            padding-bottom: 0;
            margin-bottom: 0;
            opacity: 0;
            pointer-events: none;
            border: none;
        }

        /* Кнопка закрытия */
        .close-card-btn {
            display: none; /* Скрыта по умолчанию */
        }

        /* --- Profile Layout Styles --- */
        .profile-container {
            max-width: 550px;
            margin: 0 auto;
            background: #E8D8C4;
            min-height: 100%;
            border-left: 1px solid #D4C6B0;
            border-right: 1px solid #D4C6B0;
        }

        .profile-header {
            height: 200px;
            background-color: #C7B7A3;
            background-image: url('fawn3.jpg');
            background-size: cover;
            background-position: center;
        }

        .profile-info {
            padding: 12px 16px;
            position: relative;
        }

        .profile-avatar-large {
            width: 134px;
            height: 134px;
            border-radius: 50%;
            border: 4px solid #E8D8C4;
            position: absolute;
            top: -67px;
            left: 16px;
            background: #E8D8C4;
            overflow: hidden;
        }
        
        .profile-avatar-large img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .profile-actions-top {
            display: flex;
            justify-content: flex-end;
            height: 40px;
        }

        .follow-btn {
            padding: 8px 20px;
            background: #561C24;
            color: #E8D8C4;
            border-radius: 20px;
            font-weight: 700;
            border: none;
            cursor: pointer;
            font-size: 15px;
            transition: opacity 0.2s;
        }
        .follow-btn:hover {
            opacity: 0.9;
        }

        .follow-btn.following {
            background: transparent;
            color: #561C24;
            border: 1px solid #6D2932;
        }

        .follow-btn.following:hover {
            background: rgba(217, 52, 78, 0.1);
            color: #6D2932; /* Цвет из темы вместо ярко-красного */
            border-color: #6D2932;
            opacity: 1;
        }

        /* Блюр (градиент) сверху и снизу */
        .scroll-blur {
            position: absolute;
            left: 0;
            right: 0;
            height: 60px;
            z-index: 10;
            pointer-events: none;
        }

        .scroll-blur.top {
            top: 50px; /* Сразу под хедером */
            background: linear-gradient(to bottom, #E8D8C4 20%, rgba(232, 216, 196, 0));
        }

        .scroll-blur.bottom {
            bottom: 0;
            background: linear-gradient(to top, #E8D8C4 20%, rgba(232, 216, 196, 0));
        }

        /* Toast уведомление */
        .toast-notification {
            position: absolute;
            top: 70px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
            background: #561C24;
            color: #E8D8C4;
            padding: 8px 16px;
            font-size: 13px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(86, 28, 36, 0.3);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            z-index: 2000;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .toast-notification.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        .profile-name-block {
            margin-top: 10px;
        }

        .profile-display-name {
            font-size: 20px;
            font-weight: 800;
            color: #561C24;
            font-family: 'Playfair Display', serif; /* Элегантный шрифт */
            display: flex;
            align-items: center;
            gap: 4px;
        }

        .profile-username {
            color: #6D2932;
            font-size: 15px;
            margin-top: 2px;
        }

        .profile-bio-text {
            margin-top: 12px;
            font-size: 15px;
            color: #561C24;
            line-height: 1.4;
        }

        .profile-meta {
            display: flex;
            gap: 15px;
            margin-top: 12px;
            color: #6D2932;
            font-size: 15px;
            flex-wrap: wrap;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .meta-item i {
            font-size: 14px;
        }
        
        .meta-item a {
            color: #561C24;
            text-decoration: none;
        }
        .meta-item a:hover {
            text-decoration: underline;
        }

        .profile-stats-row {
            display: flex;
            gap: 20px;
            margin-top: 12px;
            font-size: 14px;
        }

        .stat-count {
            color: #561C24;
            font-weight: 700;
        }
        
        .stat-label {
            color: #6D2932;
        }

        .profile-nav {
            display: flex;
            margin-top: 16px;
            border-bottom: 1px solid #D4C6B0;
        }

        .nav-item {
            flex: 1;
            text-align: center;
            padding: 16px 0;
            color: #6D2932;
            font-weight: 600;
            font-family: 'Playfair Display', serif; /* Элегантный шрифт */
            cursor: pointer;
            position: relative;
            transition: background 0.2s;
        }
        
        .nav-item:hover {
            background: rgba(86, 28, 36, 0.05);
        }

        .nav-item.active {
            color: #561C24;
            font-weight: 700;
        }

        .nav-item.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 56px;
            height: 4px;
            background: #561C24;
            border-radius: 2px;
        }

        /* Стили для вкладок */
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }

        /* Стили для ветки ответов (Thread) */
        .reply-thread {
            background: #E8D8C4;
            border-bottom: 1px solid #D4C6B0;
            padding: 16px;
        }

        .thread-part {
            display: flex;
            gap: 12px;
        }

        .thread-avatar-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 40px;
            flex-shrink: 0;
        }

        .thread-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #D4C6B0;
            background: #C7B7A3; /* Цвет заглушки */
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #561C24;
        }

        .thread-line {
            width: 2px;
            background: #D4C6B0;
            flex-grow: 1;
            margin: 4px 0;
            min-height: 15px;
        }

        .thread-content-col {
            flex: 1;
            padding-bottom: 12px;
        }

        .thread-meta {
            display: flex;
            gap: 6px;
            align-items: center;
            margin-bottom: 4px;
        }

        .thread-name {
            font-weight: 700;
            color: #561C24;
            font-size: 0.95rem;
        }

        .thread-handle {
            color: #6D2932;
            font-size: 0.9rem;
        }

        .thread-text {
            color: #561C24;
            font-size: 0.95rem;
            line-height: 1.4;
        }

        /* Media Grid Styles */
        .media-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
            padding: 2px;
        }

        .media-item {
            aspect-ratio: 1 / 1;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            border-radius: 4px;
            background: #D4C6B0; /* Фон для прозрачных картинок */
        }

        .media-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .media-item:hover img {
            transform: scale(1.05);
        }

        /* Lightbox Styles */
        .lightbox {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 3000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(15px);
        }

        .lightbox.active {
            opacity: 1;
            pointer-events: auto;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 85%;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: rgba(232, 216, 196, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #E8D8C4;
            font-size: 20px;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .lightbox-close:hover {
            background: rgba(232, 216, 196, 0.4);
        }

        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(232, 216, 196, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #561C24;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 3001;
        }
        .lightbox-nav:hover {
            background: #E8D8C4;
            transform: translateY(-50%) scale(1.1);
        }
        .lightbox-nav.prev { left: 20px; }
        .lightbox-nav.next { right: 20px; }
    </style>
</head>
<body>

    <div class="safari-window">
        <!-- Слой с зернистостью -->
        <div class="grain-overlay"></div>

        <div class="safari-header">
            <div class="window-controls">
                <div class="control-dot red"></div>
                <div class="control-dot yellow"></div>
                <div class="control-dot green"></div>
            </div>
            <div class="nav-controls">
                <span>&#10094;</span> <!-- Стрелка влево -->
                <span>&#10095;</span> <!-- Стрелка вправо -->
            </div>
            <div class="address-bar">
                <i class="fas fa-lock lock-icon"></i> fawn-site.com
            </div>
            <div style="width: 70px;"></div> <!-- Распорка для центровки -->
        </div>

        <div class="scroll-blur top"></div>
        <div class="scroll-blur bottom"></div>

        <!-- Toast уведомление -->
        <div class="toast-notification" id="toast">
            <i class="fas fa-check-circle"></i> You are now following fawn!
        </div>

        <!-- Lightbox для просмотра фото -->
        <div class="lightbox" id="lightbox">
            <div class="lightbox-close"><i class="fas fa-times"></i></div>
            <div class="lightbox-nav prev"><i class="fas fa-chevron-left"></i></div>
            <div class="lightbox-nav next"><i class="fas fa-chevron-right"></i></div>
            <img src="" alt="Full size">
        </div>

        <div class="content-area">
            <!-- Сюда будем добавлять контент -->
            <div class="profile-container">
                <div class="profile-header"></div>
                <div class="profile-info">
                    <div class="profile-avatar-large">
                        <img src="fawn2.jpg" alt="Avatar">
                    </div>
                    <div class="profile-actions-top">
                        <button class="follow-btn">Follow</button>
                    </div>
                    <div class="profile-name-block">
                        <div class="profile-display-name">fawn <i class="fas fa-check-circle verified-icon"></i></div>
                        <div class="profile-username">@fawnwhispers</div>
                    </div>
                    <div class="profile-bio-text">
                        creating stuff for sillytavern ✦ presets, regex & more <br>
                        welcome to my digital garden
                    </div>
                    <div class="profile-meta">
                        <div class="meta-item"><i class="fas fa-link"></i> <a href="#">fawn.site</a></div>
                        <div class="meta-item"><i class="fas fa-calendar-alt"></i> Joined May 2023</div>
                        <!-- Social Links as meta items -->
                        <div class="meta-item"><i class="fab fa-telegram"></i> <a href="#">Telegram</a></div>
                        <div class="meta-item"><i class="fab fa-github"></i> <a href="#">GitHub</a></div>
                    </div>
                    <div class="profile-stats-row">
                        <div><span class="stat-count">142</span> <span class="stat-label">Following</span></div>
                        <div><span class="stat-count">8.5K</span> <span class="stat-label">Followers</span></div>
                    </div>
                </div>
                
                <div class="profile-nav">
                    <div class="nav-item active" data-tab="tweets">Tweets</div>
                    <div class="nav-item" data-tab="replies">Replies</div>
                    <div class="nav-item" data-tab="media">Media</div>
                    <div class="nav-item" data-tab="likes">Likes</div>
                </div>

                <div id="tab-tweets" class="tab-content active">
                        <div class="card-list">
                            <!-- Карточка 1: Приветствие -->
                            <div class="tweet-card">
                                <div class="tweet-header">
                                    <div class="tweet-avatar">
                                        <img src="fawn2.jpg" alt="fawn avatar" />
                                    </div>
                                    <div class="tweet-main">
                                        <div class="tweet-author">
                                            <div class="tweet-author-info">
                                                <div class="tweet-author-name">fawn<i class="fas fa-check-circle verified-icon"></i></div>
                                                <div class="tweet-author-handle">@fawnwhispers</div>
                                            </div>
                                            <i class="fab fa-twitter tweet-icon"></i>
                                        </div>
                                        <h3 class="card-title">Приветствие</h3>
                                        <div class="tweet-body">
                                            привет-привет! <br>
                                            я — фавн, а это мой склад всего, что я делаю ручками для sillytavern <br><br>
                                            здесь вы найдёте:
                                            <ul class="tweet-list">
                                                <li>мой пресет и его гайд;</li>
                                                <li>мои регексы на улучшение визуала и гайды по установке;</li>
                                                <li>библиотеку моих расширений и расширений других авторов;</li>
                                                <li>раздел с траблшутингом</li>
                                            </ul>
                                            <br>
                                            связаться со мной можно по ссылкам ниже <br>
                                            удачного исследования.
                                        </div>
                                        <div class="tweet-actions">
                                            <div class="action-item"><i class="far fa-comment"></i> <span>12</span></div>
                                            <div class="action-item"><i class="fas fa-retweet"></i> <span>3</span></div>
                                            <div class="action-item"><i class="far fa-heart"></i> <span>42</span></div>
                                            <div class="action-item"><i class="fas fa-arrow-up-from-bracket"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Карточка 2: В работе -->
                            <div class="tweet-card">
                                <div class="tweet-header">
                                    <div class="tweet-avatar">
                                        <img src="fawn2.jpg" alt="fawn avatar" />
                                    </div>
                                    <div class="tweet-main">
                                        <div class="tweet-author"><div class="tweet-author-info"><div class="tweet-author-name">fawn<i class="fas fa-check-circle verified-icon"></i></div><div class="tweet-author-handle">@fawnwhispers</div></div></div>
                                        <h3 class="card-title">Над чем я сейчас работаю</h3>
                                        <div class="tweet-body">
                                            Здесь будет подробное описание текущих проектов. Например, разработка нового расширения для улучшения диалогов или обновление гайда по установке пресетов. Следите за обновлениями!
                                        </div>
                                        <div class="tweet-actions">
                                            <div class="action-item"><i class="far fa-comment"></i> <span>5</span></div>
                                            <div class="action-item"><i class="fas fa-retweet"></i> <span>1</span></div>
                                            <div class="action-item"><i class="far fa-heart"></i> <span>18</span></div>
                                            <div class="action-item"><i class="fas fa-arrow-up-from-bracket"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Карточка 3: Ресурсы -->
                            <div class="tweet-card">
                                <div class="tweet-header">
                                    <div class="tweet-avatar">
                                        <img src="fawn2.jpg" alt="fawn avatar" />
                                    </div>
                                    <div class="tweet-main">
                                        <div class="tweet-author"><div class="tweet-author-info"><div class="tweet-author-name">fawn<i class="fas fa-check-circle verified-icon"></i></div><div class="tweet-author-handle">@fawnwhispers</div></div></div>
                                        <h3 class="card-title">Использованные ресурсы</h3>
                                        <div class="tweet-body">
                                            Для создания этого сайта были использованы: <ul class="tweet-list"><li>Font Awesome для иконок</li><li>Google Fonts для шрифта Nunito</li><li>Чистый HTML, CSS и JavaScript</li></ul>
                                        </div>
                                        <div class="tweet-actions">
                                            <div class="action-item"><i class="far fa-comment"></i> <span>2</span></div>
                                            <div class="action-item"><i class="fas fa-retweet"></i> <span>0</span></div>
                                            <div class="action-item"><i class="far fa-heart"></i> <span>9</span></div>
                                            <div class="action-item"><i class="fas fa-arrow-up-from-bracket"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>

                <div id="tab-replies" class="tab-content">
                    <!-- Ветка 1 -->
                    <div class="reply-thread">
                        <!-- Вопрос -->
                        <div class="thread-part">
                            <div class="thread-avatar-col">
                                <div class="thread-avatar">U</div>
                                <div class="thread-line"></div>
                            </div>
                            <div class="thread-content-col">
                                <div class="thread-meta">
                                    <span class="thread-name">User Name</span>
                                    <span class="thread-handle">@username</span>
                                    <span class="thread-handle">· 2h</span>
                                </div>
                                <div class="thread-text">
                                    Placeholder for a question? Lorem ipsum dolor sit amet.
                                </div>
                            </div>
                        </div>
                        <!-- Ответ -->
                        <div class="thread-part">
                            <div class="thread-avatar-col">
                                <img src="fawn2.jpg" class="thread-avatar" alt="fawn">
                            </div>
                            <div class="thread-content-col">
                                <div class="thread-meta">
                                    <span class="thread-name">fawn</span>
                                    <i class="fas fa-check-circle verified-icon"></i>
                                    <span class="thread-handle">@fawnwhispers</span>
                                    <span class="thread-handle">· 1h</span>
                                </div>
                                <div class="thread-text">
                                    Placeholder for the answer. Yes, absolutely!
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Ветка 2 (Плейсхолдер) -->
                    <div class="reply-thread">
                        <div class="thread-part">
                            <div class="thread-avatar-col">
                                <div class="thread-avatar" style="background: #6D2932; color: #E8D8C4;">A</div>
                                <div class="thread-line"></div>
                            </div>
                            <div class="thread-content-col">
                                <div class="thread-meta"><span class="thread-name">Another User</span><span class="thread-handle">@anon</span></div>
                                <div class="thread-text">How does the regex work?</div>
                            </div>
                        </div>
                        <div class="thread-part">
                            <div class="thread-avatar-col"><img src="fawn2.jpg" class="thread-avatar" alt="fawn"></div>
                            <div class="thread-content-col">
                                <div class="thread-meta"><span class="thread-name">fawn</span><i class="fas fa-check-circle verified-icon"></i><span class="thread-handle">@fawnwhispers</span></div>
                                <div class="thread-text">Check the guide in the pinned tweet! ✦</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tab-media" class="tab-content">
                    <div class="media-grid">
                        <div class="media-item"><img src="fawn3.jpg" alt="Media 1"></div>
                        <div class="media-item"><img src="fawn2.jpg" alt="Media 2"></div>
                        <div class="media-item"><img src="fawn.png" alt="Media 3"></div>
                        <div class="media-item"><img src="fawn.png" alt="Media 4"></div>
                        <div class="media-item"><img src="fawn2.jpg" alt="Media 5"></div>
                        <div class="media-item"><img src="fawn3.jpg" alt="Media 6"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="floating-dock">
                <!-- Home -->
                <a href="/" class="dock-item active" title="Home">
                    <i class="fas fa-home"></i>
                    <span class="dock-label">Home</span>
                </a>

                <!-- Products -->
                <a href="/products" class="dock-item" title="Products">
                    <i class="fas fa-book"></i>
                    <span class="dock-label">Products</span>
                </a>

                <!-- Components -->
                <a href="/components" class="dock-item" title="Components">
                    <i class="fas fa-pen-nib"></i>
                    <span class="dock-label">Components</span>
                </a>

                <!-- About -->
                <a href="/about" class="dock-item" title="About">
                    <i class="fas fa-code"></i>
                    <span class="dock-label">About</span>
                </a>

                <!-- Changelog -->
                <a href="/changelog" class="dock-item" title="Changelog">
                    <i class="fas fa-gear"></i>
                    <span class="dock-label">Changelog</span>
                </a>

                <!-- Twitter/X -->
                <a href="https://twitter.com" class="dock-item" target="_blank" title="Twitter">
                    <i class="fas fa-wand-magic-sparkles"></i>
                    <span class="dock-label">Twitter</span>
                </a>

                <!-- GitHub -->
                <a href="https://github.com" class="dock-item" target="_blank" title="GitHub">
                    <i class="fas fa-tags"></i>
                    <span class="dock-label">GitHub</span>
                </a>
    </div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.tweet-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('active');

                // Сначала сбрасываем всё: показываем все карточки, убираем активный класс
                cards.forEach(c => {
                    c.classList.remove('active');
                    c.classList.remove('hidden');
                });

                // Если кликнули по неактивной карточке -> раскрываем её, скрываем остальные
                if (!isActive) {
                    card.classList.add('active');
                    cards.forEach(c => {
                        if (c !== card) c.classList.add('hidden');
                    });
                }
            });
        });

        const followButton = document.querySelector('.follow-btn');
        const toast = document.getElementById('toast');

        function showToast() {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        if (followButton) {
            followButton.addEventListener('click', () => {
                followButton.classList.toggle('following');
                if (followButton.classList.contains('following')) {
                    followButton.textContent = 'Following';
                    showToast();
                } else {
                    followButton.textContent = 'Follow';
                }
            });

            followButton.addEventListener('mouseover', () => {
                if (followButton.classList.contains('following')) {
                    followButton.textContent = 'Unfollow';
                }
            });

            followButton.addEventListener('mouseout', () => {
                if (followButton.classList.contains('following')) {
                    followButton.textContent = 'Following';
                }
            });
        }

        // Логика переключения вкладок
        const navItems = document.querySelectorAll('.nav-item');
        const tabContents = document.querySelectorAll('.tab-content');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Убираем активный класс у всех кнопок и контента
                navItems.forEach(nav => nav.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Добавляем активный класс нажатой кнопке
                item.classList.add('active');
                // Показываем соответствующий контент
                const tabId = item.getAttribute('data-tab');
                const targetContent = document.getElementById(`tab-${tabId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

        // Логика Lightbox (просмотр фото)
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const mediaItems = document.querySelectorAll('.media-item img');
        const prevBtn = document.querySelector('.lightbox-nav.prev');
        const nextBtn = document.querySelector('.lightbox-nav.next');
        let currentImageIndex = 0;

        mediaItems.forEach((img, index) => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                currentImageIndex = index;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        function updateLightboxImage() {
            lightboxImg.src = mediaItems[currentImageIndex].src;
        }

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex - 1 + mediaItems.length) % mediaItems.length;
            updateLightboxImage();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex + 1) % mediaItems.length;
            updateLightboxImage();
        });
    });
</script>
</body>
</html>
