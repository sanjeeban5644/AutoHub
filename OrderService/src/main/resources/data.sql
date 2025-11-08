INSERT INTO t_orders (order_date, customer_id, car_id, quantity, total_amount, status, payment_mode, delivery_date, created_at)
VALUES (NOW(), 1, 1, 1, 18000.00, 'CONFIRMED', 'CARD', '2025-11-15', NOW());

INSERT INTO t_orders (order_date, customer_id, car_id, quantity, total_amount, status, payment_mode, delivery_date, created_at)
VALUES (NOW(), 2, 3, 1, 42000.00, 'PENDING', 'UPI', '2025-11-20', NOW());

INSERT INTO t_orders (order_date, customer_id, car_id, quantity, total_amount, status, payment_mode, delivery_date, created_at)
VALUES (NOW(), 3, 2, 1, 65000.00, 'CONFIRMED', 'CASH', '2025-11-18', NOW());

INSERT INTO t_orders (order_date, customer_id, car_id, quantity, total_amount, status, payment_mode, delivery_date, created_at)
VALUES (NOW(), 4, 4, 2, 30000.00, 'CONFIRMED', 'CARD', '2025-11-22', NOW());

INSERT INTO t_orders (order_date, customer_id, car_id, quantity, total_amount, status, payment_mode, delivery_date, created_at)
VALUES (NOW(), 5, 5, 1, 55000.00, 'CANCELLED', 'UPI', NULL, NOW());