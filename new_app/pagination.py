from future.backports import OrderedDict
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PageNumberPaginationTotal(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('page_count', self.page.paginator.num_pages),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
