from flask import Flask, render_template, redirect, url_for, request, session, flash
from flask_bcrypt import Bcrypt
from pymongo import MongoClient, DESCENDING, ASCENDING
from dotenv import load_dotenv
import os
from bson import ObjectId

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
bcrypt = Bcrypt(app)

# Connecting to MongoDB
client = MongoClient(os.getenv('CONNECTION_STRING')) 
db = client.TrackExpense  
users = db.users  
expenses_collection = db.expenses

@app.route('/')
def index():
    if 'email' in session:
        return redirect(url_for('home'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = users.find_one({'email': email})
        
        if user and bcrypt.check_password_hash(user['password'], password):
            session['email'] = email
            return redirect(url_for('home'))
        else:
            flash('Invalid email or password')
    
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm-password']
        
        existing_user = users.find_one({'email': email})
        
        if existing_user:
            flash('An account with this email already exists. Please log in or use a different email.')
            return redirect(url_for('signup'))

        if password == confirm_password:
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            users.insert_one({
                'name': name,
                'email': email,
                'password': hashed_password
            })
            flash('Account created successfully! Please log in.')
            return redirect(url_for('login'))
        else:
            flash('Passwords do not match')

    return render_template('signup.html')

@app.route('/home')
def home():
    if 'email' in session:
        user = users.find_one({'email': session['email']})
        user_id = session['email']
        expenses = expenses_collection.find({'user_id': user_id}).sort('date', DESCENDING)
        return render_template('home.html', name=user['name'], expenses=expenses)
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('email', None)
    return redirect(url_for('login'))

@app.route('/add_entry', methods=['POST'])
def add_entry():
    if 'email' in session:
        user_id = session['email']
        date = request.form.get('date')
        description = request.form.get('description')
        amount = float(request.form.get('amount'))
        method = request.form.get('method')
        
        new_expense = {
            'user_id': user_id,
            'date': date,
            'description': description,
            'amount': amount,
            'method': method
        }
        expenses_collection.insert_one(new_expense)
        flash('Expense added successfully!')
        return redirect(url_for('home'))
    else:
        flash('You need to log in first.')
        return redirect(url_for('login'))

@app.route('/delete_expense/<expense_id>', methods=['POST'])
def delete_expense(expense_id):
    if 'email' in session:
        user_id = session['email']
        expense = expenses_collection.find_one({'_id': ObjectId(expense_id), 'user_id': user_id})
        if expense:
            expenses_collection.delete_one({'_id': ObjectId(expense_id)})
            flash('Expense deleted successfully!')
        else:
            flash('Expense not found or you do not have permission to delete it.')
    
    return redirect(url_for('home'))


@app.route('/edit_entry', methods=['POST'])
def edit_entry():
    if 'email' in session:
        user_id = session['email']
        expense_id_str = request.form.get('expense_id')
        date = request.form.get('date')
        description = request.form.get('description')
        amount = float(request.form.get('amount'))
        method = request.form.get('method')

        try:
            expense_id = ObjectId(expense_id_str)
        except Exception as e:
            flash('Invalid expense ID format.')
            return redirect(url_for('home'))

        result = expenses_collection.update_one(
            {'_id': expense_id, 'user_id': user_id},
            {'$set': {
                'date': date,
                'description': description,
                'amount': amount,
                'method': method
            }}
        )
        print(result)
        if result.matched_count > 0:
            flash('Expense updated successfully!')
        else:
            flash('Error: Could not update expense.')

        return redirect(url_for('home'))
    else:
        flash('You need to log in first.')
        return redirect(url_for('login'))

@app.route('/filter_expenses', methods=['POST'])
def filter_expenses():
    if 'email' in session:
        user = users.find_one({'email': session['email']})
        user_id = session['email']
        start_date = request.form.get('startDate')
        end_date = request.form.get('endDate')
        method = request.form.get('method')
        sort_by = request.form.get('sortBy')

        # Build query
        query = {}
        query['user_id'] = user_id  
        if start_date:
            query['date'] = {'$gte': start_date}
        if end_date:
            query['date'] = query.get('date', {})
            query['date']['$lte'] = end_date
        if method:
            query['method'] = method

        # Set sort order
        sort_order = []
        if sort_by == 'date_desc':
            sort_order.append(('date', DESCENDING))
        elif sort_by == 'date_asc':
            sort_order.append(('date', ASCENDING))
        elif sort_by == 'amount_desc':
            sort_order.append(('amount', DESCENDING))
        elif sort_by == 'amount_asc':
            sort_order.append(('amount', ASCENDING))

        expenses = expenses_collection.find(query).sort(sort_order)
        return render_template('home.html', name=user['name'], expenses=expenses, start_date=start_date, end_date=end_date, method=method, sort_by=sort_by)
    else:
        return redirect(url_for('login'))
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)

# if __name__ == '__main__':  
#     app.run(debug=True)