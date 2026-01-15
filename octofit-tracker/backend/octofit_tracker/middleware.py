import os

class CodespaceHostMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.codespace_name = os.environ.get('CODESPACE_NAME')

    def __call__(self, request):
        if self.codespace_name:
            request.META['HTTP_HOST'] = f'{self.codespace_name}-8000.app.github.dev'
            request.META['wsgi.url_scheme'] = 'https'
        response = self.get_response(request)
        return response