from time import sleep


def sleep_middleware(get_response):
    def middleware(request):
        response = get_response(request)
        sleep(0.3)
        return response

    return middleware
