from my_app import create_app

#create the app instance
app = create_app()

if __name__ == "main":
    app.run(host = "0.0.0.0", port=5000)


