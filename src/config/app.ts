class ApplicationConfig {
  get apiUrl() {
    return 'http://127.0.0.1:8000';
  }
}

export const appConfig = new ApplicationConfig();