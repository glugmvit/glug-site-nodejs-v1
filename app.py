from flask import Flask, request, render_template, sessions, redirect

app = Flask(__name__)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html')

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error.html'), 500

@app.route('/', methods=['GET'])
def index():
    return render_template("index.html")


@app.route('/about.html')
def about():
    return render_template("about.html")


@app.route('/team.html')
def team():
    return render_template("team.html")


@app.route('/journey.html')
def journey():
    return render_template("journey.html")


@app.route('/registration', methods=['GET', 'POST'])
def send():
    if request.method == 'POST':
        fname = request.form['fname']
        lname = request.form['lname']
        usn = request.form['usn']
        email = request.form['email']
        number = request.form['number']
        year = request.form['year']
        branch = request.form['branch']

        x = [fname, lname, usn, email, number, year, branch]
        # user = {
        #     'fname': fname,
        #     'lname': lname,
        #     'usn': usn,
        #     'email': email,
        #     'number': number,
        #     'year': year,
        #     'branch': branch
        # }

        # comented this render_templete sice there was a difficulty in comming back from the confirm.html to index.html
        # return render_template("confirm.html", lst= x)
    elif request.method == 'GET':
        return render_template("registration.html")
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
