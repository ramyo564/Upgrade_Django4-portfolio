export const diagrams = {
    'upgrade-django4-problem-overview': `
        graph LR
        Resume[Resume Upgrade Django4 Section] --> SelectOne[Select One Issue]
        SelectOne --> Trace[Trace Code Path]
        Trace --> AuthFlow[Auth Security Flow]
        Trace --> CartFlow[Cart Merge Flow]
        Trace --> PaymentFlow[Unified Payment Flow]
        Trace --> ReviewFlow[Review Trust Flow]
        Trace --> SearchFlow[Search Filter Flow]
        Trace --> AwsFlow[AWS Migration Flow]
        AuthFlow --> Problem[Problem]
        CartFlow --> Problem
        PaymentFlow --> Problem
        ReviewFlow --> Problem
        SearchFlow --> Problem
        AwsFlow --> Problem
        Problem --> Cause[Root Cause]
        Cause --> Fix[Fix Process]
        Fix --> Result[Result]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Resume,SelectOne,Trace,Problem,Cause b
        class Fix,AuthFlow,CartFlow,PaymentFlow,ReviewFlow,SearchFlow,AwsFlow o
        class Result g
    `,

    'upgrade-django4-code-evidence-map': `
        graph TB
        Root[Upgrade Django4 Code Evidence]
        Root --> Auth[Auth and Security]
        Root --> Commerce[Commerce Core]
        Root --> Review[Review and Search UX]
        Root --> Cloud[Cloud and Migration]

        Auth --> AuthFiles["accounts/views.py<br/>greatkart/urls.py<br/>greatkart/settings.py"]
        Auth --> AuthFlow["register activate token check<br/>admin_honeypot route<br/>securelogin route"]

        Commerce --> CommerceFiles["accounts/views.py login merge<br/>carts/views.py<br/>orders/views.py"]
        Commerce --> CommerceFlow["session cart_id merge<br/>place_order pending order<br/>payments and kakao approval finalize"]

        Review --> ReviewFiles["store/views.py<br/>store/models.py<br/>templates/store/product_detail.html"]
        Review --> ReviewFlow["submit_review update or create<br/>averageReview countReview metrics<br/>search sort filter paginator"]

        Cloud --> CloudFiles["greatkart/settings.py<br/>.ebextensions/db-migrate.config<br/>.ebextensions/django.config"]
        Cloud --> CloudFlow["RDS env switch in DATABASES<br/>deploy migrate command<br/>WSGI and static runtime config"]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Root,Auth,Commerce,Review,Cloud b
        class AuthFiles,CommerceFiles,ReviewFiles,CloudFiles o
        class AuthFlow,CommerceFlow,ReviewFlow,CloudFlow g
    `,

    'case-auth-security-hardening': `
        graph TB
        Signup[User Signup Request] --> Inactive[Create Account Inactive]
        Inactive --> TokenLink[Build uid and token link]
        TokenLink --> SendMail[Send Verification Email]
        SendMail --> ActivateReq[Activation URL Request]
        ActivateReq --> TokenCheck{Token Valid}
        TokenCheck -- Yes --> ActiveOn[Set is_active true]
        TokenCheck -- No --> RejectLink[Reject Invalid Link]

        AdminTry[Attack Tries Admin Route] --> Honeypot[admin honeypot path]
        RealAdmin[Real Admin Login] --> SecurePath[securelogin path]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Signup,Inactive,TokenLink,SendMail,ActivateReq,TokenCheck,AdminTry,RealAdmin b
        class Honeypot,SecurePath,RejectLink o
        class ActiveOn g
    `,

    'case-session-cart-merge': `
        graph TB
        Guest[Guest User] --> SessionKey[Create or Load session cart_id]
        SessionKey --> GuestItems[Guest CartItems with Variations]
        GuestItems --> LoginReq[Login Request]
        LoginReq --> AuthUser[Authenticate User]
        AuthUser --> LoadGuest[Load Guest CartItems]
        AuthUser --> LoadUser[Load User CartItems]
        LoadGuest --> CompareVar{Same Variation Exists}
        LoadUser --> CompareVar
        CompareVar -- Yes --> IncreaseQty[Increase Existing User Quantity]
        CompareVar -- No --> RebindUser[Assign Guest Item to User]
        IncreaseQty --> MergeDone[Unified User Cart]
        RebindUser --> MergeDone

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Guest,SessionKey,GuestItems,LoginReq,AuthUser,LoadGuest,LoadUser,CompareVar b
        class IncreaseQty,RebindUser o
        class MergeDone g
    `,

    'case-payment-unified-postprocess': `
        graph LR
        subgraph BeforeBlock [BEFORE Split Payment Post Processing]
            direction TB
            PaypalSuccess[PayPal Success] --> PaypalOnly[Path A Post Steps]
            KakaoSuccess[Kakao Success] --> KakaoOnly[Path B Post Steps]
            PaypalOnly --> Drift[Order State Drift Risk]
            KakaoOnly --> Drift
        end

        subgraph AfterBlock [AFTER Unified Order Finalization]
            direction TB
            CreateOrder[place_order creates pending order]
            CreateOrder --> PayPalPath[PayPal payments endpoint]
            CreateOrder --> KakaoPath[Kakao approval endpoint]
            PayPalPath --> Finalize[Shared Finalization Contract]
            KakaoPath --> Finalize
            Finalize --> SavePayment[Save Payment]
            Finalize --> SetOrdered[Set order is_ordered true]
            Finalize --> MoveItems[Move CartItems to OrderProduct]
            Finalize --> CopyVar[Copy Variation Set]
            Finalize --> ReduceStock[Reduce Product Stock]
            Finalize --> ClearCart[Clear User Cart]
            Finalize --> Complete[Render Order Complete]
        end

        BeforeBlock --> AfterBlock

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class CreateOrder,PayPalPath,KakaoPath,Finalize b
        class PaypalSuccess,KakaoSuccess,PaypalOnly,KakaoOnly,Drift,SavePayment,SetOrdered,MoveItems,CopyVar,ReduceStock,ClearCart o
        class Complete g
    `,

    'case-review-trust-guard': `
        graph TB
        ProductDetail[Open Product Detail] --> AuthCheck{User Logged In}
        AuthCheck -- No --> LoginPrompt[Show Login Required Message]
        AuthCheck -- Yes --> PurchaseCheck{Purchased Product}
        PurchaseCheck -- No --> BlockSubmit[Block Review Submit UI]
        PurchaseCheck -- Yes --> SubmitPath[Allow Submit Review]

        SubmitPath --> ExistingCheck{Existing Review Exists}
        ExistingCheck -- Yes --> UpdateReview[Update Existing Review]
        ExistingCheck -- No --> CreateReview[Create New Review]
        UpdateReview --> Aggregate[averageReview and countReview]
        CreateReview --> Aggregate
        Aggregate --> Render[Render Reviews and Rating Stars]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class ProductDetail,AuthCheck,PurchaseCheck,SubmitPath,ExistingCheck b
        class LoginPrompt,BlockSubmit,UpdateReview,CreateReview o
        class Aggregate,Render g
    `,

    'case-search-sort-filter-paginator': `
        graph TB
        Request[Store List Request] --> BaseQuery[Product queryset available only]
        BaseQuery --> SearchQuery[Keyword search icontains]
        BaseQuery --> CategoryState[Keep category in session]
        BaseQuery --> OptionFilter[Filter variation options]
        BaseQuery --> SortSelect[Sort by low high new avg]

        SortSelect --> NullGuard[Avg rating null to default]
        SearchQuery --> Paginator[Paginator page size control]
        CategoryState --> Paginator
        OptionFilter --> Paginator
        NullGuard --> Paginator
        Paginator --> Response[Paginated Product Response with product_count]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class Request,BaseQuery,SearchQuery,CategoryState,OptionFilter,SortSelect b
        class NullGuard,Paginator o
        class Response g
    `,

    'case-aws-migration-vpc': `
        graph TB
        LocalDev[Local SQLite Environment] --> Dump[dumpdata to json backup]
        Dump --> AwsDeploy[Deploy App to Elastic Beanstalk]
        AwsDeploy --> RdsSetup[Provision RDS PostgreSQL]
        RdsSetup --> SettingsSwitch[settings env based database switch]
        SettingsSwitch --> Load[loaddata into PostgreSQL]
        Load --> EbMigrate[ebextensions migrate command]
        EbMigrate --> Runtime[Stable Runtime with WSGI and Static Config]
        Runtime --> VpcGuard[VPC Internal DB Access Boundary]
        VpcGuard --> Result[Production Data and Security Baseline Ready]

        classDef b fill:#161b22,stroke:#58a6ff,color:#c9d1d9
        classDef o fill:#161b22,stroke:#d29922,color:#c9d1d9
        classDef g fill:#161b22,stroke:#238636,color:#c9d1d9
        class LocalDev,Dump,AwsDeploy,RdsSetup,SettingsSwitch,Load b
        class EbMigrate,Runtime,VpcGuard o
        class Result g
    `
};
