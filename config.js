import { diagrams } from './diagrams.js';

export const templateConfig = {
    system: {
        documentTitle: 'Yohan | Django Commerce Problem Solving Portfolio',
        systemName: 'DJANGO_COMMERCE_PROBLEM_SOLVING_V.1.0'
    },

    hero: {
        sectionId: 'upgrade-django4-problem-solving',
        panelTitle: 'DJANGO_COMMERCE_PROBLEM_SOLVING_OVERVIEW',
        panelUid: 'ID: DJANGO-COMMERCE-PS-00',
        diagramId: 'upgrade-django4-problem-overview',
        metrics: [
            'Django Commerce 프로젝트를 코드 단위로 추적해 문제-원인-해결-결과 흐름으로 재구성했습니다.',
            '핵심 근거는 accounts/views.py, carts/views.py, orders/views.py, store/views.py, greatkart/settings.py, .ebextensions 설정 파일입니다.',
            'README의 핵심 문제 해결 경험(AWS 마이그레이션, 인증 보안, 커머스 로직)과 실제 구현 코드 경로를 직접 매핑했습니다.',
            '각 케이스 상단 다이어그램은 before/after 또는 실행 플로우 중심으로 설계해 문맥 없이도 이해되도록 구성했습니다.'
        ]
    },

    topPanels: [
        {
            sectionId: 'upgrade-django4-code-evidence',
            panelTitle: 'CODE_EVIDENCE_MAP',
            panelUid: 'ID: DJANGO-COMMERCE-PS-01',
            diagramId: 'upgrade-django4-code-evidence-map',
            navLabel: 'CODE_EVIDENCE',
            metrics: [
                'Auth Security: accounts/views.py + greatkart/urls.py + greatkart/settings.py',
                'Commerce Core: accounts/views.py(login merge) + carts/views.py + orders/views.py',
                'Review and Search UX: store/views.py + store/models.py + templates/store/product_detail.html',
                'Cloud Migration: greatkart/settings.py + .ebextensions/db-migrate.config + README migration case'
            ]
        }
    ],

    navigation: [
        { label: 'DJANGO_COMMERCE_PROBLEM_SOLVING_OVERVIEW', target: '#upgrade-django4-problem-solving' },
        { label: 'CASES', target: '#upgrade-django4-cases' },
        { label: 'CODE_EVIDENCE', target: '#upgrade-django4-code-evidence' },
        { label: 'SKILL_SET', target: '#upgrade-django4-skill-set' },
        { label: 'CONTACT', target: '#contact' }
    ],

    skills: {
        sectionId: 'upgrade-django4-skill-set',
        panelTitle: 'SKILL_SET',
        panelUid: 'ID: DJANGO-COMMERCE-STACK',
        items: [
            { title: 'DJANGO CORE', stack: 'Python 3.11, Django 4.2, MVT, Custom User Model' },
            { title: 'COMMERCE', stack: 'Cart Merge, Order Flow, Payment Integration, Stock Update' },
            { title: 'SECURITY', stack: 'Email Token Activation, Admin Honeypot, Secure Admin Path' },
            { title: 'PAYMENT', stack: 'PayPal SDK, KakaoPay REST, Unified Post Processing' },
            { title: 'SEARCH UX', stack: 'Search, Sort, Filter, Paginator, Avg Rating Ordering' },
            { title: 'CLOUD', stack: 'AWS Elastic Beanstalk, RDS PostgreSQL, S3, VPC, Route53' }
        ]
    },

    serviceSections: [
        {
            id: 'upgrade-django4-cases',
            title: 'DJANGO_COMMERCE_TROUBLESHOOTING_CASES',
            navLabel: 'CASES',
            theme: 'blue',
            cardVisualHeight: '290px',
            cardClass: 'problem-case-card',
            groups: [
                {
                    title: 'AUTH / COMMERCE CORE',
                    desc: '인증 신뢰도, 세션 상태, 결제 후처리 일관성',
                    cards: [
                        {
                            mermaidId: 'case-auth-security-hardening',
                            anchorId: 'upgrade-django4-case-1',
                            title: 'Case 1. 이메일 인증 + 허니팟으로 인증 보안 강화',
                            subtitle: '2023-05 · accounts + greatkart URL/Settings 경로 정리',
                            overview: '회원가입 계정 신뢰도와 관리자 경로 공격 방어를\n동시에 처리하기 위해 인증/관리자 진입 경계를 분리한 케이스입니다.',
                            role: '회원가입 활성화 플로우 구현, 관리자 honeypot 경로 분리, 보안 설정 통합',
                            stackSummary: 'Django auth token, EmailMessage, admin_honeypot, URL routing',
                            problem: '1) 이메일 소유 검증 없이 가입을 허용하면 유령 계정이 생성될 수 있습니다.\n2) 기본 `/admin` 노출 상태는 무차별 로그인 시도의 표적이 됩니다.\n3) 계정 신뢰도와 관리자 접근 보안이 함께 약해지는 구조였습니다.',
                            solution: '1) `register`에서 비활성 계정 생성 후 `uid/token` 인증 링크를 메일로 발송하도록 구성했습니다.\n2) `activate`에서 `default_token_generator.check_token` 검증 통과 시에만 `is_active=True`로 전환했습니다.\n3) URL 라우팅을 `/admin -> admin_honeypot`, `/securelogin -> real admin`으로 분리했습니다.\n4) `INSTALLED_APPS`에 `admin_honeypot`을 포함해 방어 경로를 설정했습니다.',
                            result: '1) 이메일 소유권 검증이 끝난 계정만 활성화되어 계정 데이터 신뢰도가 높아졌습니다.\n2) 관리자 진입점이 노출되지 않아 공격 표면이 줄어 운영 안정성이 개선되었습니다.',
                            skills: ['Authentication Security', 'Token Verification', 'Honeypot', 'Django Routing'],
                            highlights: [
                                'register creates inactive user and sends uid token email',
                                'activate validates token before is_active switch',
                                'admin path split to honeypot and securelogin',
                                'security policy is enforced in URL and settings layers'
                            ],
                            links: [
                                { label: 'CODE_ACCOUNTS_VIEWS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/accounts/views.py' },
                                { label: 'CODE_ROOT_URLS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/greatkart/urls.py' },
                                { label: 'CODE_SETTINGS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/greatkart/settings.py' },
                                { label: 'DOC_AUTH_CASE', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-case-auth-security' }
                            ]
                        },
                        {
                            mermaidId: 'case-session-cart-merge',
                            anchorId: 'upgrade-django4-case-2',
                            title: 'Case 2. 로그인 시 세션 장바구니 병합으로 상태 일관성 확보',
                            subtitle: '2023-05 · carts + accounts login merge flow',
                            overview: '비회원 장바구니가 로그인 이후 사라지거나 중복되는 문제를\nvariation 단위 병합 규칙으로 제어한 케이스입니다.',
                            role: '세션 cart_id 설계, 로그인 병합 로직 구현, variation 중복 처리 정리',
                            stackSummary: 'Session cart_id, CartItem variations, login merge logic',
                            problem: '1) 비회원이 담은 품목이 로그인 후 계정 장바구니와 단절될 수 있었습니다.\n2) 동일 옵션 품목이 중복 라인으로 남아 수량/가격 정합성이 깨질 수 있었습니다.\n3) 익명 상태와 회원 상태의 데이터 기준이 달라 UX 단절이 발생했습니다.',
                            solution: '1) `_cart_id`로 세션 키를 발급해 비회원 장바구니를 유지했습니다.\n2) 로그인 시 세션 cart의 variation 목록과 사용자 cart variation 목록을 비교했습니다.\n3) 동일 variation이면 기존 항목 수량을 증가시키고, 없으면 item.user를 연결해 병합했습니다.\n4) 인증 사용자와 비인증 사용자 add_cart 경로를 각각 분리해 동일 규칙으로 처리했습니다.',
                            result: '1) 비회원 -> 로그인 전환 시 장바구니 품목이 유실되지 않는 흐름을 확보했습니다.\n2) 옵션 단위 중복 처리를 정리해 주문 전 금액/수량 일관성이 개선되었습니다.',
                            skills: ['Session Management', 'Cart Merge', 'Variation Dedup', 'State Consistency'],
                            highlights: [
                                'session key based cart identity for anonymous users',
                                'login merge compares variation sets between guest and user carts',
                                'duplicate variation path increments quantity',
                                'non duplicate path rebinds cart items to authenticated user'
                            ],
                            links: [
                                { label: 'CODE_CARTS_VIEWS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/carts/views.py' },
                                { label: 'CODE_LOGIN_MERGE', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/accounts/views.py' },
                                { label: 'CODE_CART_MODELS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/carts/models.py' },
                                { label: 'DOC_COMMERCE_CASE', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-case-commerce-logic' }
                            ]
                        },
                        {
                            mermaidId: 'case-payment-unified-postprocess',
                            anchorId: 'upgrade-django4-case-3',
                            title: 'Case 3. PayPal/Kakao 결제 후처리 공통화로 주문 상태 표준화',
                            subtitle: '2023-05 ~ 2023-06 · orders workflow integration',
                            overview: 'SDK 기반 PayPal과 REST 기반 KakaoPay의 결제 완료 경로를\n동일한 주문 확정 단계로 맞춰 상태 전이를 표준화한 케이스입니다.',
                            role: '주문 생성 및 결제 후처리 구현, 결제 경로 간 공통 단계 정리, 재고/장바구니 반영',
                            stackSummary: 'OrderForm, Payment model, OrderProduct, PayPal SDK, KakaoPay REST',
                            problem: '1) 결제 수단별로 후처리 로직이 분산되면 주문 상태가 경로마다 달라질 위험이 있습니다.\n2) 결제 성공 직후 재고 차감/장바구니 삭제/주문상품 생성이 누락되면 데이터 정합성이 깨집니다.\n3) 결제 수단 증가 시 유지보수 비용이 빠르게 상승합니다.',
                            solution: '1) `place_order`에서 주문번호 생성과 미결제 주문 생성 단계를 공통으로 고정했습니다.\n2) PayPal(`payments`)과 Kakao(`kakao_pay_approval`)에서 결제 엔티티 저장 후 `is_ordered=True`를 동일하게 반영했습니다.\n3) 두 경로 모두 CartItem -> OrderProduct 이관, variation 매핑, 재고 차감, 장바구니 비우기를 수행했습니다.\n4) 완료 응답은 주문완료 화면/메일 흐름으로 연결해 사용자 종료 상태를 일치시켰습니다.',
                            result: '1) 결제 채널과 무관하게 주문 확정/재고 반영/카트 정리의 핵심 상태 전이가 표준화되었습니다.\n2) 결제 장애 분석 시 공통 후처리 단계를 기준으로 빠르게 추적할 수 있게 되었습니다.',
                            skills: ['Payment Integration', 'Order Lifecycle', 'Post Processing', 'Data Consistency'],
                            highlights: [
                                'place_order creates pending order contract before payment',
                                'payments and kakao approval both finalize order and payment',
                                'cart items are moved to order products with variations',
                                'stock decrement and cart cleanup are applied in both paths'
                            ],
                            links: [
                                { label: 'CODE_ORDERS_VIEWS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/orders/views.py' },
                                { label: 'CODE_ORDERS_MODELS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/orders/models.py' },
                                { label: 'CODE_ORDER_FORM', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/orders/forms.py' },
                                { label: 'DOC_COMMERCE_CASE', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-case-commerce-logic' }
                            ]
                        }
                    ]
                },
                {
                    title: 'TRUSTED CONTENT / SEARCH UX',
                    desc: '리뷰 신뢰도와 탐색 경험 구조화',
                    cards: [
                        {
                            mermaidId: 'case-review-trust-guard',
                            anchorId: 'upgrade-django4-case-4',
                            title: 'Case 4. 리뷰 작성 권한과 평점 집계 경로를 분리해 신뢰도 확보',
                            subtitle: '2023-05 · store review permission and aggregation',
                            overview: '리뷰 데이터 신뢰도를 위해 작성 권한과 집계 경로를 분리하고\n상품 상세에서 노출 조건을 명확히 정리한 케이스입니다.',
                            role: '리뷰 권한 조건 정리, 등록/수정 흐름 구현, 평균/개수 집계 메서드 연결',
                            stackSummary: 'ReviewRating, OrderProduct check, Product.averageReview, Product.countReview',
                            problem: '1) 비로그인/미구매 사용자 리뷰를 허용하면 평점 신뢰도가 낮아질 수 있습니다.\n2) 리뷰 등록과 평점 집계가 분리되면 화면 지표와 실제 데이터가 어긋날 수 있습니다.\n3) 동일 사용자의 중복 리뷰가 누적되면 지표 왜곡이 발생합니다.',
                            solution: '1) `product_detail`에서 로그인 여부와 구매 이력(`OrderProduct`) 기반으로 작성 가능 UI를 제한했습니다.\n2) `submit_review`에서 기존 리뷰가 있으면 update, 없으면 create하는 upsert 패턴을 적용했습니다.\n3) `Product.averageReview`, `Product.countReview` 집계 메서드를 상세/목록 화면에서 공통 사용했습니다.\n4) 리뷰 조회는 `status=True` 조건으로 노출 범위를 제한했습니다.',
                            result: '1) 리뷰 작성 권한이 사용자 상태에 따라 통제되어 후기 품질이 개선되었습니다.\n2) 평점/리뷰 수 지표가 동일 집계 함수로 계산되어 화면 일관성이 향상되었습니다.',
                            skills: ['Review Trust', 'Permission Gate', 'Aggregation', 'Template Guard'],
                            highlights: [
                                'review form availability is gated by auth and purchase state',
                                'submit_review updates existing review or creates new one',
                                'averageReview and countReview centralize product metrics',
                                'only active reviews are used for customer-visible list'
                            ],
                            links: [
                                { label: 'CODE_STORE_VIEWS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/store/views.py' },
                                { label: 'CODE_STORE_MODELS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/store/models.py' },
                                { label: 'CODE_PRODUCT_DETAIL_TEMPLATE', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/templates/store/product_detail.html' },
                                { label: 'DOC_FEATURE_REVIEW', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-feature-review-system' }
                            ]
                        },
                        {
                            mermaidId: 'case-search-sort-filter-paginator',
                            anchorId: 'upgrade-django4-case-5',
                            title: 'Case 5. 검색/정렬/필터/페이지네이션 조합으로 탐색 UX 고도화',
                            subtitle: '2023-05 · store list query and rendering flow',
                            overview: '상품 탐색 과정에서 검색/정렬/필터/페이지 단위를 조합해\n사용자가 원하는 상품군에 빠르게 도달하도록 구성한 케이스입니다.',
                            role: '조회 조건 설계, 평균 평점 정렬 예외 처리, 카테고리/옵션 상태 유지 구현',
                            stackSummary: 'store/update_results/search, Paginator, Avg/Case/When annotation',
                            problem: '1) 상품 개수가 늘어날수록 단일 목록 출력은 탐색 피로를 높입니다.\n2) 카테고리/옵션/정렬을 함께 사용할 때 상태가 끊기면 결과 예측이 어렵습니다.\n3) 리뷰 없는 상품 정렬 시 null 처리 부재는 UX 혼란을 유발할 수 있습니다.',
                            solution: '1) `search`에서 키워드 검색과 `product_count`를 함께 반환해 결과 인지성을 높였습니다.\n2) `update_results`에서 category session 유지 + 옵션 필터 + sort_by를 결합했습니다.\n3) 평균 평점 정렬 시 `Case/When`으로 null을 기본값으로 치환해 정렬 안정성을 확보했습니다.\n4) `Paginator`로 목록을 페이지 단위로 분할해 렌더링 부담을 줄였습니다.',
                            result: '1) 조건 조합이 많은 탐색 시나리오에서도 목록 동작이 예측 가능해졌습니다.\n2) 검색 결과 수와 페이지 단위 제어로 사용자 탐색 효율이 개선되었습니다.',
                            skills: ['Search UX', 'Filter Composition', 'Paginator', 'Django ORM Annotation'],
                            highlights: [
                                'search returns keyword matched products and result count',
                                'update_results composes category session, filters, and sorting',
                                'avg rating ordering uses null default handling',
                                'paginator keeps list response manageable on large product sets'
                            ],
                            links: [
                                { label: 'CODE_STORE_VIEWS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/store/views.py' },
                                { label: 'CODE_STORE_TEMPLATE', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/templates/store/store.html' },
                                { label: 'DOC_FEATURE_SEARCH', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-feature-search' },
                                { label: 'DOC_FEATURE_SORT_FILTER', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-feature-sort-filter' }
                            ]
                        }
                    ]
                },
                {
                    title: 'CLOUD DEPLOYMENT / DATA MIGRATION',
                    desc: 'SQLite to PostgreSQL 이관과 AWS 운영 경계 확립',
                    cards: [
                        {
                            mermaidId: 'case-aws-migration-vpc',
                            anchorId: 'upgrade-django4-case-6',
                            title: 'Case 6. SQLite에서 PostgreSQL로 데이터 마이그레이션 및 AWS 배포 안정화',
                            subtitle: '2023-05 ~ 2023-06 · AWS migration and runtime settings',
                            overview: '로컬 SQLite 기반 개발 데이터를 AWS PostgreSQL 운영 환경으로 이전하고\nEB 런타임 설정을 통해 배포 동작을 고정한 케이스입니다.',
                            role: '환경별 DB 설정 분기, AWS 배포 설정 정리, 마이그레이션 절차 문서화',
                            stackSummary: 'Django settings DATABASES, Elastic Beanstalk, RDS PostgreSQL, VPC, .ebextensions',
                            problem: '1) 로컬 SQLite와 운영 PostgreSQL 간 스키마/데이터 환경 차이가 존재했습니다.\n2) 배포 시 migration 누락 또는 WSGI/static 설정 불일치가 서비스 장애로 이어질 수 있었습니다.\n3) 앱-DB 통신 경계가 외부에 노출되면 운영 보안 리스크가 커집니다.',
                            solution: '1) `settings.py`에서 `RDS_DB_NAME` 환경변수 기준으로 PostgreSQL/SQLite DB 구성을 분기했습니다.\n2) `.ebextensions/db-migrate.config`에 container command migrate를 정의해 배포 시 스키마 반영을 고정했습니다.\n3) `.ebextensions/django.config`에서 WSGIPath/static 경로를 지정해 런타임 구성을 표준화했습니다.\n4) README 절차대로 `dumpdata -> loaddata` 기반 이관 흐름과 VPC 내부 통신 설계를 적용했습니다.',
                            result: '1) 로컬 개발 데이터의 운영 DB 이전 절차가 문서+설정 기준으로 재현 가능해졌습니다.\n2) 환경별 설정 분리와 EB 배포 자동 단계로 운영 안정성이 개선되었습니다.\n3) git 로그 기준 인프라 커밋(`83cf0c0`, `b7b0b8e`, `de71667`, `08c8b3a`) 흐름으로 변경 추적이 가능해졌습니다.',
                            skills: ['AWS Deployment', 'DB Migration', 'Environment Separation', 'Operational Safety'],
                            highlights: [
                                'database backend switches by RDS environment variables',
                                'ebextensions includes migration command on deployment',
                                'wsgi and static path are pinned for beanstalk runtime',
                                'migration flow documented as dumpdata and loaddata sequence'
                            ],
                            links: [
                                { label: 'CODE_SETTINGS', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/greatkart/settings.py' },
                                { label: 'CODE_EB_DB_MIGRATE', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/.ebextensions/db-migrate.config' },
                                { label: 'CODE_EB_DJANGO_CONFIG', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/.ebextensions/django.config' },
                                { label: 'DOC_AWS_CASE', href: 'https://github.com/ramyo564/Upgrade_Django4/tree/main#lm-case-aws-migration' },
                                { label: 'GIT_COMMIT_POSTGRES_SETTINGS', href: 'https://github.com/ramyo564/Upgrade_Django4/commit/b7b0b8e' },
                                { label: 'GIT_COMMIT_S3_SETTINGS', href: 'https://github.com/ramyo564/Upgrade_Django4/commit/de71667' }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    contact: {
        sectionId: 'contact',
        panelTitle: 'CONTACT',
        panelUid: 'ID: DJANGO-COMMERCE-COMMS',
        description: 'Django Commerce 포트폴리오 관련 문의는 아래 채널로 부탁드립니다.',
        actions: [
            { label: 'EMAIL', href: 'mailto:yohan032yohan@gmail.com' },
            { label: 'GITHUB', href: 'https://github.com/ramyo564/Upgrade_Django4' },
            { label: 'README', href: 'https://github.com/ramyo564/Upgrade_Django4/blob/main/README.md' }
        ]
    },

    mermaid: {
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'Inter',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'linear'
        }
    },

    diagrams
};
