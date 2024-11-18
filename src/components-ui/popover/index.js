import { angular, app } from 'vendors';
import './styles';

export default app.directive("ngPopover", ['$compile', '$timeout', '$rootScope',($compile, $timeout, $rootScope) => {
    return {
        restrict : "A",
        link : function (scope, element, attrb) {
            let body = document.body;
            let popoverWrap, popover, popoverBtnClose;
            let popoverActiveClass = 'popup-is-opened';

            function popoverShow() {
                popover = popoverTemplate();
                popoverWrap = document.createElement('div');
                popoverWrap.id = 'popover';
                popoverWrap.classList.add('popover');
                popoverWrap.innerHTML = popover;

                body.classList.add(popoverActiveClass);
                body.append(popoverWrap);

                popoverBtnClose = popoverWrap.querySelector('.popover-close');
                popoverBtnClose.addEventListener('click', popoverHide, false);
            }

            function popoverHide() {
                popoverWrap = document.getElementById('popover');

                if (popoverWrap) {
                    popoverWrap.parentNode.removeChild(popoverWrap);
                    popoverBtnClose.removeEventListener('click', popoverHide, false);
                    body.classList.remove(popoverActiveClass);
                }
            }

            function createComponent() {
                compileContents();
                return `<${attrb.ngComponent} base="${attrb.ngComponentAttr}"></${attrb.ngComponent}>`;
            }

            function compileContents() {
                $timeout(() => {
                    $compile(angular.element(popoverWrap).contents())(scope);
                }, 10);
            }

            function popoverTemplate() {
                return `
                    <div class="popover-content">
                        <div class="popover-outer">
                            <div class="popover-inner">
                                ${createComponent()}
                            </div>
                            <div class="popover-close"><i class="fa fa-times" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="popover-overlay"></div>
                `;
            }

            element.on('click', popoverShow);

            // destroy
            scope.$on('$destroy', () => {
                popoverHide();
                element.off('click');
            });

            $rootScope.$on('popover:hide', () => {
                popoverHide();
            });
        }
    };
}]);