# Load shared TypoScripts
<INCLUDE_TYPOSCRIPT: source="FILE:system/_shared/Configuration/TypoScript/Setup.ts">

# Website TypoScripts
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/Config.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/Breadcrumb.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/MainNavigation.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/SubNavigationOne.ts">
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/Page.ts">

# Local Development
<INCLUDE_TYPOSCRIPT: source="FILE:system/<%= websiteProject %>/Configuration/TypoScript/Setup/LocalDevelopment.ts">