const tabsContent = document.querySelector('.tabs-content');
const tabsNav = document.querySelector('.tabs-nav');
const articles = Array.from(tabsContent.children);
const activeTabClassName = 'ui-tabs-active';
const hiddenArticleClassName = 'hidden';
let tabs;

function addTabs() {
    const tab = tabsNav.removeChild(tabsNav.firstElementChild);

    articles.forEach(article => {
        const newTab = tab.cloneNode(true);
        newTab.firstElementChild.innerHTML = article.dataset.tabTitle;
        newTab.firstElementChild.classList.add(article.dataset.tabIcon);

        tabsNav.appendChild(newTab);
    });

    tabs = Array.from(tabsNav.querySelectorAll('li'));
}

function openTab(tab) {
    const article = tabsContent.querySelector(`[data-tab-title="${tab.firstElementChild.innerHTML}"]`);

    articles.forEach(article => {
        article.classList.add(hiddenArticleClassName);
    });

    article.classList.remove(hiddenArticleClassName);
    tabs.forEach(tab => {
        tab.classList.remove(activeTabClassName);
    });

    tab.classList.add(activeTabClassName);
}

function onTabClick(event) {
    const tab = event.currentTarget;
    openTab(tab);
}

function initTabs() {
    addTabs();
    openTab(tabsNav.firstElementChild);

    tabs.forEach(tab => {
        tab.addEventListener('click', onTabClick);
    })
}

document.addEventListener('DOMContentLoaded', initTabs);